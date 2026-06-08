import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';
import { EffectComposer } from 'https://unpkg.com/three@0.168.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.168.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.168.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'https://unpkg.com/three@0.168.0/examples/jsm/postprocessing/SMAAPass.js';

const vertexShader = `
varying vec2 v_uv;
void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_lightScatterDivider;
uniform float u_lightScatterPowInv;
uniform vec3 u_bgColor;

varying vec2 v_uv;

float random(vec2 coords) {
    return fract(sin(dot(coords.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 dithering(vec3 color) {
    float grid_position = random(gl_FragCoord.xy);
    vec3 dither_shift = vec3(0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0);
    dither_shift = mix(2.0 * dither_shift, -2.0 * dither_shift, grid_position);
    return color + dither_shift;
}

void main() {
    vec2 uv = v_uv;
    vec2 mouse = u_mouse;

    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 uvCorrected = uv * aspect;
    vec2 mouseCorrected = mouse * aspect;

    float dist = distance(uvCorrected, mouseCorrected);

    float scatter = pow(max(0.0, 1.0 - dist / (u_lightScatterDivider / 100.0)), 1.0 / u_lightScatterPowInv);

    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 color = mix(u_bgColor, lightColor, scatter * 0.15);

    color = dithering(color);

    gl_FragColor = vec4(color, 1.0);
}
`;

export class WebGLBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.mouse = { x: 0.5, y: 0.5 };
        this.targetMouse = { x: 0.5, y: 0.5 };
        this.isRunning = false;

        this._onMouseMove = this._onMouseMove.bind(this);
        this._onResize = this._onResize.bind(this);
        this._onVisibilityChange = this._onVisibilityChange.bind(this);
    }

    init() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isMobile = width <= 1280;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false,
            alpha: false,
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x101010);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 400);
        this.camera.position.z = 5;

        this.uniforms = {
            u_resolution: { value: new THREE.Vector2(width, height) },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
            u_lightScatterDivider: { value: 150.0 },
            u_lightScatterPowInv: { value: 0.4 },
            u_bgColor: { value: new THREE.Color(0x101010) },
        };

        const geometry = new THREE.PlaneGeometry(1000, 1000);
        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader,
            dithering: true,
        });

        this.bgMesh = new THREE.Mesh(geometry, material);
        this.bgMesh.position.z = -50;
        this.scene.add(this.bgMesh);

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));

        if (!isMobile) {
            const bloomPass = new UnrealBloomPass(
                new THREE.Vector2(width, height),
                0.3,
                0.4,
                0.85
            );
            this.composer.addPass(bloomPass);

            const smaaPass = new SMAAPass(width, height);
            this.composer.addPass(smaaPass);
        }

        window.addEventListener('mousemove', this._onMouseMove);
        window.addEventListener('resize', this._onResize);
        document.addEventListener('visibilitychange', this._onVisibilityChange);

        this.isRunning = true;
    }

    _onMouseMove(e) {
        this.targetMouse.x = e.clientX / window.innerWidth;
        this.targetMouse.y = 1.0 - e.clientY / window.innerHeight;
    }

    _onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.composer.setSize(width, height);

        this.uniforms.u_resolution.value.set(width, height);
    }

    _onVisibilityChange() {
        this.isRunning = !document.hidden;
    }

    update() {
        if (!this.isRunning) return;

        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;
        this.uniforms.u_mouse.value.set(this.mouse.x, this.mouse.y);

        this.composer.render();
    }

    destroy() {
        this.isRunning = false;
        window.removeEventListener('mousemove', this._onMouseMove);
        window.removeEventListener('resize', this._onResize);
        document.removeEventListener('visibilitychange', this._onVisibilityChange);
        this.renderer.dispose();
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
