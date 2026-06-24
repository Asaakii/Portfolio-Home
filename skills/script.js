(function () {
    'use strict';

    var skillData = {
        '摄影': '用快门留住差点被遗忘的光。\n器材在手里待久了，慢慢就不看参数了，只看光。',
        '弹吉他': '手指和琴弦之间的私人对话。\n不为演出，不为录音，只是需要一种不用语言的表达。',
        '音乐制作': '把情绪变成可以回放的空气。\n从一个 loop 开始，叠加、删减，直到它听起来像当时的心情。',
        '直播': '把独处变成一场有人旁听的自言自语。\n镜头打开的时候，孤独感反而消失了。',
        '登山': '用身体丈量垂直的距离。\n山顶什么也没有，但上去之后什么都不一样了。',
        '徒步': '走到信号消失的地方，旅程才真正开始。\n不赶路的时候，路会告诉你很多事。',
        '潜水': '在水下，呼吸变成唯一能听见的声音。\n世界突然慢了下来，安静得像另一个星球。',
        'Vibe Coding': '用自然语言和 AI 一起，把想法直接变成能跑的东西。\n写代码不再是翻译思路，而是对话。',
        '硬件开发': '让想法长出电路板、传感器和物理按钮。\n屏幕里的逻辑变成手里的温度，那一刻最真实。',
        '软件开发': '把逻辑编织成日常可用的工具。\n好的软件是安静的——它在那里工作，你几乎忘了它的存在。'
    };

    var edges = {
        create: [[0, 1], [0, 2], [1, 2], [0, 3]],
        adventure: [[0, 1], [0, 2], [1, 2]],
        engineering: [[0, 1], [0, 2], [1, 2]]
    };

    var sky = document.getElementById('sky');
    var detailPanel = document.getElementById('detailPanel');
    var detailName = document.getElementById('detailName');
    var detailDesc = document.getElementById('detailDesc');
    var svgLines = document.getElementById('constellationLines');
    var bgCanvas = document.getElementById('bgCanvas');
    var pageTitle = document.getElementById('pageTitle');
    var activeButton = null;
    var isMobile = window.innerWidth <= 768;
    var titleHidden = false;

    function initBackgroundStars() {
        var ctx = bgCanvas.getContext('2d');
        var dpr = window.devicePixelRatio || 1;
        var w = window.innerWidth;
        var h = window.innerHeight;
        bgCanvas.width = w * dpr;
        bgCanvas.height = h * dpr;
        ctx.scale(dpr, dpr);

        var count = Math.floor((w * h) / 3200);
        for (var i = 0; i < count; i++) {
            var x = Math.random() * w;
            var y = Math.random() * h;
            var r = Math.random() * 1.1 + 0.15;
            var alpha = Math.random() * 0.3 + 0.03;
            var warmth = Math.random();
            var red, green, blue;
            if (warmth > 0.6) {
                red = 230 + Math.floor(Math.random() * 25);
                green = 200 + Math.floor(Math.random() * 30);
                blue = 140 + Math.floor(Math.random() * 40);
            } else {
                red = 180 + Math.floor(Math.random() * 40);
                green = 190 + Math.floor(Math.random() * 30);
                blue = 200 + Math.floor(Math.random() * 30);
            }
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
            ctx.fill();
        }
    }

    function drawConstellationLines() {
        svgLines.innerHTML = '';
        if (isMobile) return;

        var groups = document.querySelectorAll('.constellation');
        groups.forEach(function (group) {
            var groupName = group.dataset.group;
            var groupEdges = edges[groupName];
            if (!groupEdges) return;

            var stars = group.querySelectorAll('.star');
            groupEdges.forEach(function (edge) {
                var a = stars[edge[0]];
                var b = stars[edge[1]];
                if (!a || !b) return;

                var rectA = a.querySelector('.star-dot').getBoundingClientRect();
                var rectB = b.querySelector('.star-dot').getBoundingClientRect();

                var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', rectA.left + rectA.width / 2);
                line.setAttribute('y1', rectA.top + rectA.height / 2);
                line.setAttribute('x2', rectB.left + rectB.width / 2);
                line.setAttribute('y2', rectB.top + rectB.height / 2);
                line.dataset.group = groupName;
                svgLines.appendChild(line);
            });
        });
    }

    function setupMobileDetails() {
        var stars = document.querySelectorAll('.star');
        stars.forEach(function (star) {
            var next = star.nextElementSibling;
            if (next && next.classList.contains('mobile-detail')) return;

            var detail = document.createElement('div');
            detail.className = 'mobile-detail';
            var p = document.createElement('p');
            p.textContent = skillData[star.dataset.skill] || '';
            detail.appendChild(p);
            star.parentNode.insertBefore(detail, star.nextSibling);
        });
    }

    function hideTitle() {
        if (titleHidden || !pageTitle) return;
        titleHidden = true;
        pageTitle.classList.add('fade-out');
    }

    function selectStar(button) {
        if (!button) return;
        var name = button.dataset.skill;
        var desc = skillData[name];
        if (!desc) return;

        hideTitle();

        if (activeButton === button) {
            deselectAll();
            return;
        }

        if (activeButton) {
            activeButton.setAttribute('aria-pressed', 'false');
        }

        activeButton = button;
        button.setAttribute('aria-pressed', 'true');
        sky.classList.add('has-selection');

        var group = button.closest('.constellation');
        document.querySelectorAll('.constellation').forEach(function (c) {
            c.classList.toggle('active', c === group);
        });

        svgLines.querySelectorAll('line').forEach(function (line) {
            line.classList.toggle('active', line.dataset.group === (group ? group.dataset.group : ''));
        });

        if (isMobile) {
            document.querySelectorAll('.mobile-detail').forEach(function (d) {
                d.classList.remove('visible');
            });
            var mobileDetail = button.nextElementSibling;
            if (mobileDetail && mobileDetail.classList.contains('mobile-detail')) {
                mobileDetail.classList.add('visible');
            }
        } else {
            detailName.textContent = name;
            detailDesc.textContent = desc;
            detailPanel.classList.add('visible');
        }
    }

    function deselectAll() {
        if (activeButton) {
            activeButton.setAttribute('aria-pressed', 'false');
            activeButton = null;
        }
        sky.classList.remove('has-selection');
        detailPanel.classList.remove('visible');

        document.querySelectorAll('.constellation').forEach(function (c) {
            c.classList.remove('active');
        });
        svgLines.querySelectorAll('line').forEach(function (line) {
            line.classList.remove('active');
        });
        document.querySelectorAll('.mobile-detail').forEach(function (d) {
            d.classList.remove('visible');
        });
    }

    document.querySelectorAll('.star').forEach(function (star) {
        star.addEventListener('click', function (e) {
            e.stopPropagation();
            selectStar(this);
        });

        star.addEventListener('focus', function () {
            if (!isMobile) selectStar(this);
        });
    });

    sky.addEventListener('click', function (e) {
        if (!e.target.closest('.star')) {
            deselectAll();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') deselectAll();
    });

    function handleResize() {
        isMobile = window.innerWidth <= 768;
        initBackgroundStars();
        drawConstellationLines();
        if (isMobile) {
            setupMobileDetails();
            detailPanel.classList.remove('visible');
        }
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 200);
    });

    initBackgroundStars();
    drawConstellationLines();
    if (isMobile) setupMobileDetails();
})();
