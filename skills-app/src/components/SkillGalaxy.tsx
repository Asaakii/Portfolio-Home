import { Html, OrbitControls, Stars } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { buildSkillStars, skills, type SkillGroupId, type SkillStar } from '../skills';
import { useAtlasStore } from '../store';

function makeNebula(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const intensities = new Float32Array(count);
  const green = new THREE.Color('#55f0aa');
  const gold = new THREE.Color('#f0ba54');
  const rose = new THREE.Color('#ff5da8');
  const violet = new THREE.Color('#9a79ff');
  const white = new THREE.Color('#fff0c4');
  const blueWhite = new THREE.Color('#c7dfff');
  const scratch = new THREE.Color();

  for (let i = 0; i < count; i += 1) {
    const lane = Math.random();
    const wideField = Math.random() < 0.72;
    let x = 0;
    let y = 0;
    let z = 0;
    let centerGlow = 0;
    let bandStrength = 0;
    let r = 0;

    if (wideField) {
      x = (Math.random() - 0.5) * radius * 2.95;
      y = (Math.random() - 0.5) * radius * 1.62;
      z = (Math.random() - 0.5) * radius * 1.25;
      const greenBand = y - Math.sin(x * 0.34) * 1.9 + 1.2;
      const warmBand = y + Math.sin(x * 0.28 + 1.8) * 1.6 - 2.1;
      const roseBand = y + Math.sin(x * 0.22 - 0.9) * 1.3 + 3.1;
      bandStrength = Math.max(
        Math.exp(-greenBand * greenBand * 0.22),
        Math.exp(-warmBand * warmBand * 0.18),
        Math.exp(-roseBand * roseBand * 0.16)
      );
      r = Math.hypot(x * 0.52, y * 0.86);
      centerGlow = Math.max(0, 1 - Math.hypot(x * 0.72 + 1.8, y * 1.2 + 0.4) / (radius * 0.75));
    } else {
      r = Math.pow(Math.random(), 1.65) * radius * 1.05;
      const armOffset = lane < 0.42 ? -1.2 : lane < 0.78 ? 0.4 : 1.9;
      const angle = armOffset + r * 0.72 + (Math.random() - 0.5) * 1.1;
      x = Math.cos(angle) * r * 1.98 + (Math.random() - 0.5) * 2.2 - 1.2;
      y = Math.sin(angle * 1.7) * r * 0.2 + (Math.random() - 0.5) * 3.4 - 0.2;
      z = Math.sin(angle) * r * 0.92 + (Math.random() - 0.5) * 4.8;
      centerGlow = Math.max(0, 1 - r / (radius * 0.52));
      bandStrength = 0.8;
    }

    const voidA = Math.exp(-Math.pow((x - 5.6) * 0.22, 2) - Math.pow((y + 0.4) * 0.42, 2));
    const voidB = Math.exp(-Math.pow((x + 8.8) * 0.19, 2) - Math.pow((y - 2.8) * 0.36, 2));
    const dimByVoid = Math.max(0.12, 1 - voidA * 0.58 - voidB * 0.48);
    const rareBright = Math.random() > 0.992;

    if (centerGlow > 0.5 && Math.random() < 0.74) {
      scratch.copy(white).lerp(blueWhite, Math.random() * 0.42);
    } else if (wideField && y > 1.2) {
      scratch.copy(green).lerp(blueWhite, Math.random() * 0.28);
    } else if (wideField && y < -2.0) {
      scratch.copy(blueWhite).lerp(gold, Math.random() * 0.36);
    } else if (lane < 0.5) {
      scratch.copy(green).lerp(gold, Math.random() * 0.24);
    } else if (lane < 0.76) {
      scratch.copy(gold).lerp(rose, Math.random() * 0.42);
    } else {
      scratch.copy(rose).lerp(violet, Math.random() * 0.5);
    }

    const color = scratch.clone().multiplyScalar((0.42 + Math.random() * 1.04 + centerGlow * 1.12 + bandStrength * 0.46) * dimByVoid);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    sizes[i] = rareBright ? 1.25 + Math.random() * 1.65 : 0.2 + Math.random() * 0.58 + centerGlow * 0.42 + bandStrength * 0.12;
    intensities[i] = rareBright ? 1.7 + Math.random() * 1.05 : (0.2 + Math.random() * 1.04 + centerGlow * 0.8 + bandStrength * 0.64) * dimByVoid;
  }

  return { positions, colors, sizes, intensities };
}

function NebulaCloud() {
  const quality = useAtlasStore((state) => state.quality);
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = quality === 'high' ? 128000 : 36000;
  const { positions, colors, sizes, intensities } = useMemo(() => makeNebula(particleCount, 8.2), [particleCount]);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        uniforms: {
          uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.8) },
          uBaseSize: { value: quality === 'high' ? 8.9 : 7.6 }
        },
        vertexShader: `
          attribute float size;
          attribute float intensity;
          varying vec3 vColor;
          varying float vIntensity;
          uniform float uBaseSize;
          uniform float uPixelRatio;

          void main() {
            vColor = color;
            vIntensity = intensity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * uBaseSize * uPixelRatio * (1.0 / max(0.7, -mvPosition.z));
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vIntensity;

          void main() {
            vec2 uv = gl_PointCoord - vec2(0.5);
            float dist = length(uv);
            float core = smoothstep(0.16, 0.015, dist);
            float halo = smoothstep(0.5, 0.12, dist) * 0.36;
            float alpha = (core + halo) * vIntensity;
            gl_FragColor = vec4(vColor, alpha);
          }
        `
      }),
    [quality]
  );

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.z += delta * 0.004;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-intensity" args={[intensities, 1]} />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  );
}

function StarMaterial({ quality }: { quality: 'high' | 'light' }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        uniforms: {
          uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.8) },
          uBaseSize: { value: quality === 'high' ? 15 : 12 }
        },
        vertexShader: `
          attribute float size;
          attribute float intensity;
          varying vec3 vColor;
          varying float vIntensity;
          uniform float uBaseSize;
          uniform float uPixelRatio;

          void main() {
            vColor = color;
            vIntensity = intensity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * uBaseSize * uPixelRatio * (1.0 / max(0.55, -mvPosition.z));
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vIntensity;

          void main() {
            vec2 uv = gl_PointCoord - vec2(0.5);
            float dist = length(uv);
            float core = smoothstep(0.17, 0.02, dist);
            float halo = smoothstep(0.5, 0.08, dist) * 0.34;
            float alpha = (core + halo) * vIntensity;
            gl_FragColor = vec4(vColor, alpha);
          }
        `
      }),
    [quality]
  );

  return <primitive object={material} attach="material" />;
}

function SkillStarCloud() {
  const quality = useAtlasStore((state) => state.quality);
  const activeGroup = useAtlasStore((state) => state.activeGroup);
  const activeSkillId = useAtlasStore((state) => state.activeSkillId);
  const pointsRef = useRef<THREE.Points>(null);
  const satelliteStars = useMemo(() => buildSkillStars(), []);
  const selectedGroup = activeSkillId ? skills.find((skill) => skill.id === activeSkillId)?.group : activeGroup;
  const { positions, colors, sizes, intensities } = useMemo(() => {
    const visibleStars = quality === 'high' ? satelliteStars : satelliteStars.filter((_, index) => index % 2 === 0);
    const positionArray = new Float32Array(visibleStars.length * 3);
    const colorArray = new Float32Array(visibleStars.length * 3);
    const sizeArray = new Float32Array(visibleStars.length);
    const intensityArray = new Float32Array(visibleStars.length);

    visibleStars.forEach((star: SkillStar, index: number) => {
      const color = new THREE.Color(star.color);
      const isDimmed = selectedGroup !== 'all' && selectedGroup !== star.group;
      positionArray[index * 3] = star.position[0];
      positionArray[index * 3 + 1] = star.position[1];
      positionArray[index * 3 + 2] = star.position[2];
      colorArray[index * 3] = color.r * (isDimmed ? 0.06 : 1);
      colorArray[index * 3 + 1] = color.g * (isDimmed ? 0.06 : 1);
      colorArray[index * 3 + 2] = color.b * (isDimmed ? 0.06 : 1);
      const isActive = activeSkillId === star.skillId;
      sizeArray[index] = star.size * (isActive ? 2.4 : isDimmed ? 0.3 : 0.68);
      intensityArray[index] = star.intensity * (isActive ? 1.85 : isDimmed ? 0.06 : 0.9);
    });

    return { positions: positionArray, colors: colorArray, sizes: sizeArray, intensities: intensityArray };
  }, [activeGroup, activeSkillId, quality, satelliteStars, selectedGroup]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.006;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-intensity" args={[intensities, 1]} />
      </bufferGeometry>
      <StarMaterial quality={quality} />
    </points>
  );
}

function SkillNode({
  skill,
  transientGroup
}: {
  skill: (typeof skills)[number];
  transientGroup: SkillGroupId | 'all' | null;
}) {
  const activeSkillId = useAtlasStore((state) => state.activeSkillId);
  const activeGroup = useAtlasStore((state) => state.activeGroup);
  const labelsVisible = useAtlasStore((state) => state.labelsVisible);
  const setActiveSkill = useAtlasStore((state) => state.setActiveSkill);
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeSkillId === skill.id;
  const isFiltered = activeGroup !== 'all' && activeGroup !== skill.group;
  const isTransient = transientGroup === 'all' || transientGroup === skill.group;
  const showLabel = isActive || isHovered || labelsVisible || isTransient;
  const beaconClassName = [
    'skill-beacon',
    isActive ? 'is-active' : '',
    isHovered ? 'is-hovered' : '',
    isFiltered ? 'is-filtered' : ''
  ].join(' ');

  return (
    <group position={skill.position}>
      <Html center distanceFactor={8.8} position={[0, 0, 0]} occlude={false}>
        <div
          className={beaconClassName}
          style={{ '--skill-color': skill.color, '--beacon-scale': `${0.86 + skill.level * 0.08}` } as React.CSSProperties}
          aria-hidden="true"
        />
      </Html>
      <mesh
        onPointerOver={(event) => {
          event.stopPropagation();
          setIsHovered(true);
          document.body.classList.add('is-pointing-skill');
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          setIsHovered(false);
          document.body.classList.remove('is-pointing-skill');
        }}
        onClick={(event) => {
          event.stopPropagation();
          setActiveSkill(isActive ? null : skill.id);
        }}
      >
        <sphereGeometry args={[0.18 + skill.level * 0.025, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {showLabel ? (
        <Html center distanceFactor={9.4} position={[0, -0.2, 0]} occlude={false}>
          <button
            className={[
              'skill-label',
              isActive ? 'is-active' : '',
              isFiltered ? 'is-filtered' : ''
            ].join(' ')}
            type="button"
            style={{ '--skill-color': skill.color } as React.CSSProperties}
            aria-pressed={isActive}
            onClick={(event) => {
              event.stopPropagation();
              setActiveSkill(isActive ? null : skill.id);
            }}
          >
            <span>{skill.name}</span>
          </button>
        </Html>
      ) : null}
    </group>
  );
}

function CameraFocus() {
  const controlsRef = useRef<React.ElementRef<typeof OrbitControls>>(null);
  const activeSkillId = useAtlasStore((state) => state.activeSkillId);
  const activeGroup = useAtlasStore((state) => state.activeGroup);
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const activeSkill = skills.find((skill) => skill.id === activeSkillId);
    if (activeSkill) {
      target.set(...activeSkill.position);
    } else if (activeGroup !== 'all') {
      const groupSkills = skills.filter((skill) => skill.group === activeGroup);
      const center = groupSkills.reduce(
        (acc, skill) => [acc[0] + skill.position[0], acc[1] + skill.position[1], acc[2] + skill.position[2]],
        [0, 0, 0]
      ).map((value) => value / groupSkills.length) as [number, number, number];
      target.set(...center);
    } else {
      target.set(0, 0, 0);
    }

    if (controlsRef.current) {
      controlsRef.current.target.lerp(target, 0.045);
      controlsRef.current.update();
    }

    if (activeSkill) {
      const desired = new THREE.Vector3(activeSkill.position[0] * 0.28, activeSkill.position[1] * 0.24, 7.1 + activeSkill.position[2] * 0.18);
      camera.position.lerp(desired, 0.018);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.055}
      enablePan={false}
      rotateSpeed={0.36}
      zoomSpeed={0.82}
      minDistance={3.6}
      maxDistance={15}
      minPolarAngle={Math.PI * 0.22}
      maxPolarAngle={Math.PI * 0.78}
    />
  );
}

export function SkillGalaxy() {
  const setActiveSkill = useAtlasStore((state) => state.setActiveSkill);
  const activeGroup = useAtlasStore((state) => state.activeGroup);
  const [transientGroup, setTransientGroup] = useState<SkillGroupId | 'all' | null>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return undefined;
    }

    setTransientGroup(activeGroup);
    const timeoutId = window.setTimeout(() => setTransientGroup(null), activeGroup === 'all' ? 900 : 1700);
    return () => window.clearTimeout(timeoutId);
  }, [activeGroup]);

  return (
    <>
      <color attach="background" args={['#050712']} />
      <fog attach="fog" args={['#050712', 16, 34]} />
      <ambientLight intensity={0.2} />
      <Stars radius={42} depth={30} count={2600} factor={2.2} saturation={0.08} fade speed={0.12} />
      <NebulaCloud />
      <SkillStarCloud />
      {skills.map((skill) => (
        <SkillNode skill={skill} transientGroup={transientGroup} key={skill.id} />
      ))}
      <mesh position={[0, 0, -4]} onClick={() => setActiveSkill(null)}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <CameraFocus />
    </>
  );
}
