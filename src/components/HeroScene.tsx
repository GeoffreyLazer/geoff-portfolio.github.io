import { Float, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ROBOT_MODEL_PATH = "/models/robot-full-optimized.glb";

type PointerRef = MutableRefObject<{ x: number; y: number }>;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function useWindowPointer(enabled: boolean) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
      pointer.current.y = (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enabled]);

  return pointer;
}

function ImportedRobot({
  compact,
  pointer,
  reducedMotion,
  onReady,
}: {
  compact: boolean;
  pointer: PointerRef;
  reducedMotion: boolean;
  onReady: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, ROBOT_MODEL_PATH);

  const robot = useMemo(() => {
    const clone = gltf.scene.clone(true);
    const meshes: THREE.Mesh[] = [];
    const armorMaterial = new THREE.MeshPhysicalMaterial({
      color: "#dfe8e3",
      emissive: "#09292c",
      emissiveIntensity: 0.08,
      metalness: 0.68,
      roughness: 0.33,
      clearcoat: 0.34,
      clearcoatRoughness: 0.42,
      side: THREE.DoubleSide,
    });
    const graphiteMaterial = new THREE.MeshPhysicalMaterial({
      color: "#141b1d",
      emissive: "#031113",
      emissiveIntensity: 0.12,
      metalness: 0.82,
      roughness: 0.28,
      clearcoat: 0.22,
      clearcoatRoughness: 0.48,
      side: THREE.DoubleSide,
    });
    const cyanMaterial = new THREE.MeshStandardMaterial({
      color: "#bafcff",
      emissive: "#19e6ff",
      emissiveIntensity: 1.3,
      metalness: 0.3,
      roughness: 0.24,
      side: THREE.DoubleSide,
    });
    const warmMaterial = new THREE.MeshStandardMaterial({
      color: "#ffe0b8",
      emissive: "#ffb86b",
      emissiveIntensity: 0.9,
      metalness: 0.2,
      roughness: 0.34,
      side: THREE.DoubleSide,
    });

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });
    const isSingleMeshModel = meshes.length <= 1;

    const hashName = (name: string) =>
      Array.from(name).reduce((hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0, 7);

    meshes.forEach((child) => {
      if (!child.geometry.attributes.normal) {
        child.geometry.computeVertexNormals();
      }

      const name = child.name.toLowerCase();
      const hash = hashName(name);
      const isMechanicalPart = !isSingleMeshModel && (name.includes("tube") || hash % 11 === 0);
      const isCyanAccent = hash % 43 === 0;
      const isWarmAccent = hash % 67 === 0;

      child.material = isCyanAccent
        ? cyanMaterial
        : isWarmAccent
          ? warmMaterial
          : isMechanicalPart
            ? graphiteMaterial
            : armorMaterial;
      child.material.needsUpdate = true;
      child.castShadow = false;
      child.receiveShadow = false;
      child.frustumCulled = false;
    });

    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    clone.position.sub(center);

    return clone;
  }, [gltf.scene]);

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;

    const elapsed = clock.getElapsedTime();
    group.current.rotation.x = Math.sin(elapsed * 0.2) * 0.02 + pointer.current.y * 0.025;
    group.current.rotation.y = -0.32 + Math.sin(elapsed * 0.14) * 0.045 + pointer.current.x * 0.04;
    group.current.rotation.z = Math.sin(elapsed * 0.16) * 0.012;
    group.current.position.y = (compact ? -0.03 : 0.26) + Math.sin(elapsed * 0.34) * 0.055;
  });

  const cyanAccent = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#19e6ff",
        transparent: true,
        opacity: 0.86,
      }),
    [],
  );
  const warmAccent = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffb86b",
        transparent: true,
        opacity: 0.78,
      }),
    [],
  );

  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <Float
      speed={reducedMotion ? 0 : 0.7}
      rotationIntensity={reducedMotion ? 0 : 0.025}
      floatIntensity={reducedMotion ? 0 : 0.1}
    >
      <group
        ref={group}
        scale={compact ? 0.00415 : 0.00515}
        position={compact ? [0.18, -0.03, 0] : [0.82, 0.26, 0]}
      >
        <primitive object={robot} />
        <group position={[0, 0, 218]}>
          <mesh material={cyanAccent} position={[0, 280, 0]} scale={[82, 7, 5]}>
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
          <mesh material={cyanAccent} position={[-70, 88, 0]} scale={[46, 6, 5]} rotation={[0, 0, -0.18]}>
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
          <mesh material={cyanAccent} position={[70, 88, 0]} scale={[46, 6, 5]} rotation={[0, 0, 0.18]}>
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
          <mesh material={warmAccent} position={[104, 210, 5]} scale={[10, 10, 10]}>
            <sphereGeometry args={[1, 14, 14]} />
          </mesh>
          <mesh material={warmAccent} position={[-112, -34, 5]} scale={[8, 8, 8]}>
            <sphereGeometry args={[1, 14, 14]} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function RobotHeadMeshFallback({
  compact,
  pointer,
  reducedMotion,
}: {
  compact: boolean;
  pointer: PointerRef;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;

    const elapsed = clock.getElapsedTime();
    group.current.rotation.x = Math.sin(elapsed * 0.2) * 0.025 + pointer.current.y * 0.035;
    group.current.rotation.y = -0.42 + Math.sin(elapsed * 0.18) * 0.07 + pointer.current.x * 0.06;
    group.current.position.y = (compact ? -0.18 : -0.04) + Math.sin(elapsed * 0.35) * 0.06;
  });

  const shellMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ccfff0",
        emissive: "#19e6ff",
        emissiveIntensity: 0.46,
        metalness: 0.58,
        roughness: 0.22,
        transparent: true,
        opacity: 0.52,
        side: THREE.DoubleSide,
      }),
    [],
  );
  const wireMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#7cff9d",
        transparent: true,
        opacity: 0.48,
        wireframe: true,
      }),
    [],
  );
  const accentMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#19e6ff",
        transparent: true,
        opacity: 0.82,
      }),
    [],
  );

  return (
    <Float
      speed={reducedMotion ? 0 : 0.62}
      rotationIntensity={reducedMotion ? 0 : 0.04}
      floatIntensity={reducedMotion ? 0 : 0.12}
    >
      <group ref={group} position={[0.08, compact ? -0.18 : -0.04, 0]} scale={compact ? 0.78 : 1}>
        <mesh material={shellMaterial} scale={[0.95, 1.25, 0.68]} position={[-0.12, 0.56, 0]}>
          <dodecahedronGeometry args={[1, 2]} />
        </mesh>
        <mesh material={wireMaterial} scale={[0.98, 1.28, 0.7]} position={[-0.12, 0.56, 0]}>
          <dodecahedronGeometry args={[1.01, 2]} />
        </mesh>
        <mesh material={shellMaterial} scale={[0.62, 0.78, 0.08]} position={[0.56, 0.44, 0.2]} rotation={[0, -0.18, 0]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh material={shellMaterial} scale={[0.44, 0.3, 0.42]} position={[0.35, -0.54, 0.05]} rotation={[0, -0.12, -0.08]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh material={shellMaterial} scale={[0.38, 0.82, 0.38]} position={[-0.16, -1.18, 0]} rotation={[0.05, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.28, 1, 16]} />
        </mesh>
        <mesh material={accentMaterial} position={[0.74, 0.56, 0.28]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.08, 32]} />
        </mesh>
        <mesh material={accentMaterial} scale={[0.62, 0.025, 0.025]} position={[0.66, 0.83, 0.43]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh material={accentMaterial} scale={[0.04, 0.04, 0.04]} position={[0.94, 0.56, 0.32]}>
          <sphereGeometry args={[1, 12, 12]} />
        </mesh>
      </group>
    </Float>
  );
}

function HologramRings({ compact, reducedMotion }: { compact: boolean; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;

    const elapsed = clock.getElapsedTime();
    group.current.rotation.y = Math.sin(elapsed * 0.12) * 0.08;
    group.current.rotation.z = Math.sin(elapsed * 0.18) * 0.025;
  });

  return (
    <group ref={group} position={compact ? [0.14, -1.78, -0.12] : [0.76, -2.15, -0.18]} scale={compact ? 0.74 : 0.9}>
      <mesh rotation={[Math.PI / 2.08, 0, -0.08]} position={[0, 0, 0]}>
        <torusGeometry args={[compact ? 1.24 : 1.9, 0.008, 8, 112]} />
        <meshBasicMaterial color="#19e6ff" transparent opacity={0.16} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0, 0.08]} position={[0.08, 0.02, 0]}>
        <torusGeometry args={[compact ? 0.9 : 1.45, 0.006, 8, 96]} />
        <meshBasicMaterial color="#7cff9d" transparent opacity={0.11} />
      </mesh>
      <mesh position={[0.16, 0.08, 0.62]} scale={[compact ? 1.25 : 1.8, 0.008, 0.008]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#7cff9d" transparent opacity={0.36} />
      </mesh>
    </group>
  );
}

function InterfaceParticles({
  compact,
  pointer,
  reducedMotion,
}: {
  compact: boolean;
  pointer: PointerRef;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: compact ? 9 : 18 }, (_, index) => {
        const column = index % 6;
        const row = Math.floor(index / 6);
        return {
          color: ["#19e6ff", "#7cff9d", "#ffb86b"][index % 3],
          position: [
            -2.6 + column * 1.04 + ((index * 7) % 3) * 0.08,
            -1.8 + row * 1.1 + ((index * 5) % 4) * 0.07,
            -0.52 + ((index * 11) % 7) * 0.11,
          ] as [number, number, number],
          size: 0.018 + (index % 3) * 0.008,
        };
      }),
    [compact],
  );

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;

    const elapsed = clock.getElapsedTime();
    group.current.position.y = Math.sin(elapsed * 0.42) * 0.05;
    group.current.rotation.y = pointer.current.x * 0.025;
    group.current.rotation.x = pointer.current.y * 0.02;
  });

  return (
    <group ref={group}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[node.size, 8, 8]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function SceneContents({
  compact,
  reducedMotion,
  onModelReady,
}: {
  compact: boolean;
  reducedMotion: boolean;
  onModelReady: () => void;
}) {
  const pointer = useWindowPointer(!reducedMotion);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, compact ? 0.12 : 0.28, compact ? 8.7 : 8.5]} fov={compact ? 44 : 41} />
      <fog attach="fog" args={["#05080b", 8.6, 20]} />
      <ambientLight intensity={0.42} />
      <hemisphereLight args={["#d9fff0", "#05080b", 0.46]} />
      <directionalLight position={[3.8, 5.2, 5.4]} intensity={3.2} color="#f4fff8" />
      <directionalLight position={[-4.6, 1.4, 3.2]} intensity={1.7} color="#19e6ff" />
      <pointLight position={[2.8, 2.4, 4.4]} intensity={10} color="#19e6ff" />
      <pointLight position={[-3.6, 0.6, 2.8]} intensity={4.8} color="#ffb86b" />
      <pointLight position={[0, -2.8, 4.4]} intensity={2.4} color="#7cff9d" />
      <InterfaceParticles compact={compact} pointer={pointer} reducedMotion={reducedMotion} />
      <HologramRings compact={compact} reducedMotion={reducedMotion} />
      <Suspense fallback={<RobotHeadMeshFallback compact={compact} pointer={pointer} reducedMotion={reducedMotion} />}>
        <ImportedRobot compact={compact} pointer={pointer} reducedMotion={reducedMotion} onReady={onModelReady} />
      </Suspense>
    </>
  );
}

function HeroSceneFallback() {
  return (
    <div className="hero-scene-fallback" aria-hidden="true">
      <span className="hero-fallback-core" />
      <span className="hero-fallback-body" />
      <span className="hero-fallback-arm hero-fallback-arm-left" />
      <span className="hero-fallback-arm hero-fallback-arm-right" />
      <span className="hero-fallback-leg hero-fallback-leg-left" />
      <span className="hero-fallback-leg hero-fallback-leg-right" />
      <span className="hero-fallback-ring hero-fallback-ring-one" />
      <span className="hero-fallback-ring hero-fallback-ring-two" />
      <span className="hero-fallback-node hero-fallback-node-one" />
      <span className="hero-fallback-node hero-fallback-node-two" />
      <span className="hero-fallback-node hero-fallback-node-three" />
    </div>
  );
}

export default function HeroScene() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery("(max-width: 760px)");
  const staticOnly = useMediaQuery("(max-width: 520px)");
  const [modelReady, setModelReady] = useState(false);
  const handleModelReady = useCallback(() => setModelReady(true), []);

  return (
    <div className={`hero-scene${staticOnly ? " is-static" : ""}${modelReady ? " is-loaded" : ""}`} aria-hidden="true">
      <HeroSceneFallback />
      {!staticOnly && (
        <Canvas
          dpr={[1, 1.35]}
          frameloop={reducedMotion ? "demand" : "always"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <SceneContents compact={compact} reducedMotion={reducedMotion} onModelReady={handleModelReady} />
        </Canvas>
      )}
    </div>
  );
}
