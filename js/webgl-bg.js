import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';

const COLORS = [0x79d8ff, 0x4b7cff, 0xff4fb3, 0xf9b0ff];

function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}

function disposeObject(object) {
    object.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
            if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose());
            } else {
                child.material.dispose();
            }
        }
    });
}

export class WebGLBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.mouse = { x: 0.5, y: 0.5 };
        this.targetMouse = { x: 0.5, y: 0.5 };
        this.clock = new THREE.Clock();
        this.isRunning = false;
        this.streakMeshes = [];
        this.figureBasePositions = null;
        this.isMobile = false;

        this._onMouseMove = this._onMouseMove.bind(this);
        this._onResize = this._onResize.bind(this);
        this._onVisibilityChange = this._onVisibilityChange.bind(this);
    }

    init() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.isMobile = width <= 1280;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false,
            alpha: false,
            powerPreference: 'high-performance',
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(this.isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x02030d);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x02030d, 0.028);

        this.camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 140);
        this.camera.position.set(0, 0.15, 8);
        this.camera.lookAt(0, 0, -14);

        this.streaks = this._createStreaks();
        this.scene.add(this.streaks);

        this.heroBeams = this._createHeroBeams();
        this.scene.add(this.heroBeams);

        this.ground = this._createGround();
        this.scene.add(this.ground);

        this.figure = this._createParticleFigure();
        this.scene.add(this.figure);

        this.coreLight = new THREE.PointLight(0x70d8ff, 6, 26);
        this.coreLight.position.set(1.8, -0.15, -8);
        this.scene.add(this.coreLight);

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));

        if (!this.isMobile) {
            this.bloomPass = new UnrealBloomPass(
                new THREE.Vector2(width, height),
                0.32,
                0.25,
                0.36
            );
            this.composer.addPass(this.bloomPass);
            this.composer.addPass(new SMAAPass(width, height));
        }

        window.addEventListener('mousemove', this._onMouseMove);
        window.addEventListener('resize', this._onResize);
        document.addEventListener('visibilitychange', this._onVisibilityChange);

        this.isRunning = true;
        this.clock.start();
    }

    _createStreaks() {
        const group = new THREE.Group();
        const count = this.isMobile ? 72 : 170;

        for (let i = 0; i < count; i++) {
            const color = new THREE.Color(COLORS[i % COLORS.length]);
            const material = new THREE.MeshBasicMaterial({
                color,
                transparent: true,
                opacity: randomBetween(0.28, 0.62),
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                side: THREE.DoubleSide,
            });

            const geometry = new THREE.PlaneGeometry(
                randomBetween(2.8, 9.5),
                randomBetween(0.026, 0.085)
            );
            const mesh = new THREE.Mesh(geometry, material);
            this._resetStreak(mesh, true);
            group.add(mesh);
            this.streakMeshes.push(mesh);
        }

        return group;
    }

    _resetStreak(mesh, initial = false) {
        const z = initial ? randomBetween(-46, 7) : randomBetween(-50, -32);
        const spread = THREE.MathUtils.mapLinear(z, -50, 7, 15, 4.5);
        const x = randomBetween(-spread, spread);
        const y = randomBetween(-6.2, 6.2);
        const angle = Math.atan2(y * 0.75, x || 0.001);

        mesh.position.set(x, y, z);
        mesh.rotation.set(0, 0, angle);
        mesh.scale.setScalar(randomBetween(0.65, 1.1));
        mesh.userData.speed = randomBetween(14, 32);
        mesh.userData.baseOpacity = randomBetween(0.24, 0.62);
        mesh.userData.spin = randomBetween(-0.08, 0.08);
    }

    _createHeroBeams() {
        const group = new THREE.Group();
        const beamData = [
            [-9.2, 3.8, -8, -0.18, 13, 0.07, 0x7ecbff, 0.38],
            [-7.4, 2.6, -7, -0.28, 11, 0.06, 0xff4fb3, 0.32],
            [8.6, 3.1, -8, 0.22, 13, 0.07, 0x7ecbff, 0.34],
            [7.2, 1.8, -7, 0.32, 11, 0.06, 0xff4fb3, 0.36],
            [-8.7, -1.2, -9, -0.52, 12, 0.055, 0x7ecbff, 0.28],
            [8.2, -0.7, -9, 0.48, 12, 0.055, 0xff4fb3, 0.28],
            [-5.8, 5.1, -12, -0.08, 8, 0.045, 0x9ab7ff, 0.28],
            [5.4, 4.7, -12, 0.08, 8, 0.045, 0xff78c8, 0.28],
        ];

        for (const [x, y, z, angle, width, height, color, opacity] of beamData) {
            const geometry = new THREE.PlaneGeometry(width, height);
            const material = new THREE.MeshBasicMaterial({
                color,
                transparent: true,
                opacity,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                side: THREE.DoubleSide,
            });
            const beam = new THREE.Mesh(geometry, material);
            beam.position.set(x, y, z);
            beam.rotation.z = angle;
            beam.userData.baseOpacity = opacity;
            group.add(beam);
        }

        return group;
    }

    _createGround() {
        const group = new THREE.Group();
        const geometry = new THREE.PlaneGeometry(70, 54, 1, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x040715,
            transparent: true,
            opacity: 0.72,
            depthWrite: false,
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2.65;
        plane.position.set(0, -3.2, -20);
        group.add(plane);

        const lineGeometry = new THREE.PlaneGeometry(34, 0.055);
        for (let i = 0; i < 12; i++) {
            const lineMaterial = new THREE.MeshBasicMaterial({
                color: i % 2 ? 0xff4fb3 : 0x79d8ff,
                transparent: true,
                opacity: 0.22,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                side: THREE.DoubleSide,
            });
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.position.set((i - 5.5) * 1.7, -2.72, -18 - i * 2.7);
            line.rotation.set(-Math.PI / 2.7, 0, i % 2 ? -0.22 : 0.22);
            line.userData.speed = randomBetween(4, 8);
            group.add(line);
        }

        return group;
    }

    _createParticleFigure() {
        const points = [];
        const colors = [];
        const colorA = new THREE.Color(0x86e4ff);
        const colorB = new THREE.Color(0xff5cc0);
        const colorC = new THREE.Color(0xffffff);

        const pushPoint = (x, y, z, mix = Math.random()) => {
            points.push(x, y, z);
            const color = mix > 0.82 ? colorC : colorA.clone().lerp(colorB, mix);
            colors.push(color.r, color.g, color.b);
        };

        for (let i = 0; i < 140; i++) {
            const a = Math.random() * Math.PI * 2;
            const r = Math.sqrt(Math.random()) * 0.34;
            pushPoint(Math.cos(a) * r, 1.45 + Math.sin(a) * r, randomBetween(-0.08, 0.08), Math.random());
        }

        const limb = (from, to, count, width, mixOffset = 0) => {
            for (let i = 0; i < count; i++) {
                const t = i / (count - 1);
                const x = THREE.MathUtils.lerp(from[0], to[0], t) + randomBetween(-width, width);
                const y = THREE.MathUtils.lerp(from[1], to[1], t) + randomBetween(-width, width);
                const z = THREE.MathUtils.lerp(from[2], to[2], t) + randomBetween(-width, width);
                pushPoint(x, y, z, (t + mixOffset) % 1);
            }
        };

        limb([0, 1.1, 0], [0.05, 0.12, 0.02], 180, 0.065, 0.1);
        limb([0.02, 0.9, 0], [-0.62, 0.35, 0.05], 110, 0.05, 0.35);
        limb([0.02, 0.78, 0], [0.72, 1.02, -0.02], 110, 0.05, 0.7);
        limb([0.02, 0.14, 0], [-0.42, -0.86, 0.03], 150, 0.058, 0.2);
        limb([-0.42, -0.86, 0.03], [-0.1, -1.48, 0.04], 80, 0.045, 0.5);
        limb([0.02, 0.08, 0], [0.55, -0.48, -0.03], 135, 0.058, 0.78);
        limb([0.55, -0.48, -0.03], [0.92, -0.18, -0.04], 70, 0.045, 0.1);

        for (let i = 0; i < 260; i++) {
            const t = Math.random();
            const x = randomBetween(-0.4, 0.35) * (1 - t) + randomBetween(-0.08, 0.08);
            const y = 1.15 - t * 2.8 + randomBetween(-0.04, 0.04);
            const z = randomBetween(-0.26, 0.26);
            pushPoint(x, y, z, Math.random());
        }

        const geometry = new THREE.BufferGeometry();
        const positionArray = new Float32Array(points);
        this.figureBasePositions = new Float32Array(points);
        geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

        const material = new THREE.PointsMaterial({
            size: this.isMobile ? 0.075 : 0.105,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.72,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const figure = new THREE.Points(geometry, material);
        figure.position.set(3.15, -0.24, -5.2);
        figure.rotation.set(0.08, -0.28, -0.06);
        figure.scale.setScalar(this.isMobile ? 1.0 : 1.25);
        return figure;
    }

    _onMouseMove(e) {
        this.targetMouse.x = e.clientX / window.innerWidth;
        this.targetMouse.y = e.clientY / window.innerHeight;
    }

    _onResize() {
        if (!this.renderer || !this.camera) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        this.isMobile = width <= 1280;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setPixelRatio(this.isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(width, height);
        if (this.composer) this.composer.setSize(width, height);
        if (this.bloomPass) this.bloomPass.setSize(width, height);
    }

    _onVisibilityChange() {
        this.isRunning = !document.hidden;
        if (this.isRunning) this.clock.getDelta();
    }

    _updateFigure(time) {
        if (!this.figure || !this.figureBasePositions) return;

        const positions = this.figure.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const y = this.figureBasePositions[i + 1];
            positions[i] = this.figureBasePositions[i] + Math.sin(time * 2.2 + y * 5.5) * 0.012;
            positions[i + 1] = y + Math.sin(time * 2.8 + i * 0.018) * 0.01;
            positions[i + 2] = this.figureBasePositions[i + 2] + Math.cos(time * 2.1 + i * 0.01) * 0.018;
        }
        this.figure.geometry.attributes.position.needsUpdate = true;

        const mouseX = this.mouse.x - 0.5;
        const mouseY = this.mouse.y - 0.5;
        this.figure.rotation.y = -0.28 + mouseX * 0.22;
        this.figure.rotation.x = 0.08 + mouseY * 0.12;
        this.figure.material.opacity = 0.58 + Math.sin(time * 2.4) * 0.1;
        this.figure.material.size = (this.isMobile ? 0.075 : 0.105) + Math.sin(time * 3.2) * 0.008;
    }

    update() {
        if (!this.isRunning || !this.renderer) return;

        const delta = Math.min(this.clock.getDelta(), 0.04);
        const time = this.clock.elapsedTime;

        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.045;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.045;

        const parallaxX = (this.mouse.x - 0.5) * 0.45;
        const parallaxY = (this.mouse.y - 0.5) * 0.22;
        this.camera.position.x += (parallaxX - this.camera.position.x) * 0.04;
        this.camera.position.y += (0.15 - parallaxY - this.camera.position.y) * 0.04;
        this.camera.lookAt(0, 0, -14);

        for (const streak of this.streakMeshes) {
            streak.position.z += streak.userData.speed * delta;
            streak.rotation.z += streak.userData.spin * delta;
            const fade = THREE.MathUtils.clamp((streak.position.z + 50) / 58, 0, 1);
            streak.material.opacity = streak.userData.baseOpacity * fade;
            if (streak.position.z > 8) this._resetStreak(streak, false);
        }

        if (this.heroBeams) {
            this.heroBeams.children.forEach((beam, index) => {
                beam.material.opacity = beam.userData.baseOpacity * (0.75 + Math.sin(time * 2 + index) * 0.25);
            });
        }

        if (this.ground) {
            for (const child of this.ground.children) {
                if (!child.userData.speed) continue;
                child.position.z += child.userData.speed * delta;
                if (child.position.z > 5) child.position.z = -36;
            }
        }

        this._updateFigure(time);
        this.coreLight.intensity = 5.5 + Math.sin(time * 2.5) * 1.5;

        if (this.composer) this.composer.render();
        else this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        this.isRunning = false;
        window.removeEventListener('mousemove', this._onMouseMove);
        window.removeEventListener('resize', this._onResize);
        document.removeEventListener('visibilitychange', this._onVisibilityChange);

        if (this.scene) disposeObject(this.scene);
        if (this.composer) this.composer.dispose();
        if (this.renderer) this.renderer.dispose();
    }

    static isWebGLAvailable() {
        try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
        } catch {
            return false;
        }
    }
}
