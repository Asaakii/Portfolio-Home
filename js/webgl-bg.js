import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';

const vertexShader = `
varying vec3 v_worldPosition;
void main() {
    v_worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform vec3 u_color;
uniform vec3 u_cameraPosition;
uniform vec3 u_lightPosition;
uniform vec3 u_lightColor;
uniform float u_lightScatterDivider;
uniform float u_lightScatterPowInv;

varying vec3 v_worldPosition;

float random(vec2 coords) {
    return fract(sin(dot(coords.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 dithering(vec3 color) {
    float grid_position = random(gl_FragCoord.xy);
    vec3 dither_shift = vec3(0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0);
    dither_shift = mix(2.0 * dither_shift, -2.0 * dither_shift, grid_position);
    return color + dither_shift;
}

float getScatter(vec3 start, vec3 dir, vec3 lightPos, float d) {
    vec3 q = start - lightPos;
    float b = dot(dir, q);
    float c = dot(q, q);
    float t = c - b * b;
    float s = 1.0 / sqrt(max(0.0001, t));
    float l = s * (atan((d + b) * s) - atan(b * s));
    return pow(max(0.0, l / u_lightScatterDivider), u_lightScatterPowInv);
}

void main() {
    vec3 toCameraWorld = v_worldPosition - u_cameraPosition;
    vec3 nToCameraWorldDir = normalize(toCameraWorld);
    float toCameraDist = length(toCameraWorld);

    float scatter = getScatter(u_cameraPosition, nToCameraWorldDir, u_lightPosition, toCameraDist);

    vec3 color = u_color * 0.15 * (0.65 + 0.4 * scatter) + scatter * u_lightColor;

    gl_FragColor = vec4(dithering(color), 1.0);
}
`;

export class WebGLBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.mouse = { x: 0.5, y: 0.5 };
        this.targetMouse = { x: 0.5, y: 0.5 };
        this.mouse3 = new THREE.Vector3(0, 0, 0);
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
            u_color: { value: new THREE.Color(0x101010) },
            u_cameraPosition: { value: this.camera.position },
            u_lightPosition: { value: this.mouse3 },
            u_lightColor: { value: new THREE.Color(0x00B3FF) },
            u_lightScatterDivider: { value: 150.0 },
            u_lightScatterPowInv: { value: 0.4 },
        };

        const geometry = new THREE.PlaneGeometry(1000, 1000);
        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader,
            dithering: true,
            blending: THREE.NoBlending,
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

    _screenToWorld(mx, my) {
        const vector = new THREE.Vector3(
            (mx - 0.5) * 2,
            (my - 0.5) * 2,
            0.5
        );
        vector.unproject(this.camera);
        const dir = vector.sub(this.camera.position).normalize();
        const distance = -this.camera.position.z / dir.z;
        const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
        return pos;
    }

    _onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.composer.setSize(width, height);
    }

    _onVisibilityChange() {
        this.isRunning = !document.hidden;
    }

    update() {
        if (!this.isRunning) return;

        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        const worldPos = this._screenToWorld(this.mouse.x, this.mouse.y);
        this.mouse3.copy(worldPos);

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
