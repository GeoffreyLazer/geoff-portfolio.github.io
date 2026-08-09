import { Float, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

function useWindowPointer() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return pointer;
}

function KineticCore({ pointer }: { pointer: PointerRef }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const elapsed = clock.getElapsedTime();
    group.current.rotation.x = elapsed * 0.12 + pointer.current.y * 0.12;
    group.current.rotation.y = elapsed * 0.18 + pointer.current.x * 0.22;
    group.current.rotation.z = Math.sin(elapsed * 0.45) * 0.08;
  });

  return (
    <Float speed={1.35} rotationIntensity={0.22} floatIntensity={0.35}>
      <group ref={group} position={[0.35, 0.05, 0]}>
        <mesh>
          <sphereGeometry args={[1.08, 34, 34]} />
          <meshStandardMaterial
            color="#9fffc7"
            emissive="#65ff65"
            emissiveIntensity={0.24}
            metalness={0.38}
            roughness={0.18}
            transparent
            opacity={0.16}
            wireframe
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.35, 3]} />
          <meshStandardMaterial
            color="#c9faff"
            emissive="#00f5ff"
            emissiveIntensity={0.42}
            metalness={0.72}
            roughness={0.24}
            transparent
            opacity={0.55}
            wireframe
          />
        </mesh>
        {[-0.78, -0.42, -0.1, 0.28, 0.62].map((offset, index) => (
          <mesh key={offset} position={[0, offset, 0]} rotation={[Math.PI / 2, 0, index * 0.22]}>
            <torusGeometry args={[1.08 + index * 0.07, 0.01, 18, 160]} />
            <meshStandardMaterial
              color={index % 2 ? "#00f5ff" : "#65ff65"}
              emissive={index % 2 ? "#00f5ff" : "#65ff65"}
              emissiveIntensity={1.1}
              metalness={0.72}
              roughness={0.2}
              transparent
              opacity={0.78}
            />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[1.72, 0.018, 18, 160]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={1.8}
            metalness={0.88}
            roughness={0.16}
          />
        </mesh>
        <mesh rotation={[0.42, Math.PI / 2, 0.35]}>
          <torusGeometry args={[2.08, 0.012, 18, 180]} />
          <meshStandardMaterial
            color="#c7ff36"
            emissive="#c7ff36"
            emissiveIntensity={1.25}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <mesh rotation={[0.2, 0.34, Math.PI / 2]}>
          <torusKnotGeometry args={[1.05, 0.018, 180, 12, 2, 5]} />
          <meshStandardMaterial
            color="#ff2bd6"
            emissive="#ff2bd6"
            emissiveIntensity={1.15}
            metalness={0.65}
            roughness={0.28}
          />
        </mesh>
      </group>
    </Float>
  );
}

function ShardField({ pointer }: { pointer: PointerRef }) {
  const group = useRef<THREE.Group>(null);
  const shards = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => {
        const angle = (index / 42) * Math.PI * 2;
        const radius = 2.5 + ((index * 23) % 17) * 0.16;
        const y = ((index * 31) % 19) * 0.13 - 1.12;
        return {
          position: [
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius - 0.4,
          ] as [number, number, number],
          rotation: [
            index * 0.41,
            index * 0.27,
            index * 0.19,
          ] as [number, number, number],
          size: 0.045 + (index % 5) * 0.012,
          color: ["#00f5ff", "#c7ff36", "#ff2bd6", "#835cff"][index % 4],
        };
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const elapsed = clock.getElapsedTime();
    group.current.rotation.y = elapsed * 0.035 + pointer.current.x * 0.08;
    group.current.rotation.x = pointer.current.y * 0.04;
  });

  return (
    <group ref={group}>
      {shards.map((shard, index) => (
        <mesh
          key={index}
          position={shard.position}
          rotation={shard.rotation}
          scale={[1, 1.8, 1]}
        >
          <tetrahedronGeometry args={[shard.size, 0]} />
          <meshStandardMaterial
            color={shard.color}
            emissive={shard.color}
            emissiveIntensity={0.75}
            metalness={0.58}
            roughness={0.2}
            transparent
            opacity={0.76}
          />
        </mesh>
      ))}
    </group>
  );
}

function HorizonGrid() {
  const grid = useRef<THREE.GridHelper>(null);

  useEffect(() => {
    if (!grid.current) return;
    const materials = Array.isArray(grid.current.material)
      ? grid.current.material
      : [grid.current.material];
    materials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.28;
    });
  }, []);

  useFrame(({ clock }) => {
    if (!grid.current) return;
    grid.current.position.z = (clock.getElapsedTime() * 0.55) % 2;
  });

  return (
    <gridHelper
      ref={grid}
      args={[56, 56, "#00f5ff", "#17142f"]}
      position={[0, -2.2, -1.2]}
    />
  );
}

function SceneContents() {
  const pointer = useWindowPointer();
  const { size } = useThree();
  const isNarrow = size.width < 700;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.35, 6.2]} fov={45} />
      <fog attach="fog" args={["#03020a", 8, 25]} />
      <ambientLight intensity={0.42} />
      <pointLight position={[3.2, 3.6, 3.8]} intensity={17} color="#00f5ff" />
      <pointLight position={[-3.4, 1.2, 2.6]} intensity={7} color="#c7ff36" />
      <pointLight position={[0, -2.4, 4]} intensity={7} color="#ff2bd6" />
      <group rotation={[-0.58, 0, 0]} position={[0, -0.2, 0]}>
        <HorizonGrid />
      </group>
      <group
        position={isNarrow ? [0, -1.08, -0.55] : [1.72, -0.04, 0]}
        scale={isNarrow ? 0.74 : 1}
      >
        <ShardField pointer={pointer} />
        <KineticCore pointer={pointer} />
      </group>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="scene-backdrop" aria-hidden="true">
      <Canvas
        dpr={[1, 1.7]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}
