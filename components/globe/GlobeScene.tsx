"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { DesignWork } from "@/lib/designs";

const RADIUS = 3.2;
const TILE_W = 1.1;
const TILE_H = 1.45;
const HOT = "#be3a26";
const AUTO_ROTATE_SPEED = 0.04; // rad/s
const IDLE_RESUME_MS = 2000;
const DAMPING = 0.95;

type DragState = {
  dragging: boolean;
  velTheta: number;
  velPhi: number;
  lastX: number;
  lastY: number;
  idleSince: number;
};

function useFibonacciSphere(count: number, radius: number) {
  return useMemo(() => {
    const points: THREE.Vector3[] = [];
    const offset = 2 / count;
    const increment = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * increment;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      points.push(new THREE.Vector3(x, y, z).multiplyScalar(radius));
    }
    return points;
  }, [count, radius]);
}

function LoadingFallback() {
  return (
    <Html center>
      <p className="whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-soft">
        loading the wall…
      </p>
    </Html>
  );
}

function Tile({
  position,
  item,
  onSelect,
}: {
  position: THREE.Vector3;
  item: DesignWork;
  onSelect: (item: DesignWork) => void;
}) {
  const texture = useTexture(item.src);
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { gl } = useThree();

  useLayoutEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    g.position.copy(position);
    // Facing the local -Z axis at the origin points the plane's default
    // +Z normal outward, away from the sphere's center.
    g.lookAt(0, 0, 0);
  }, [position]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const target = hovered ? 1.12 : 1;
    mesh.scale.x += (target - mesh.scale.x) * 0.18;
    mesh.scale.y += (target - mesh.scale.y) * 0.18;
  });

  const handleOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHovered(true);
      gl.domElement.style.cursor = "pointer";
    },
    [gl]
  );
  const handleOut = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHovered(false);
      gl.domElement.style.cursor = "auto";
    },
    [gl]
  );
  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onSelect(item);
    },
    [item, onSelect]
  );

  return (
    <group ref={groupRef}>
      {/* Red frame — sits just behind the tile, shown only on hover. */}
      <mesh position={[0, 0, -0.02]} visible={hovered}>
        <planeGeometry args={[TILE_W * 1.16, TILE_H * 1.12]} />
        <meshBasicMaterial color={HOT} toneMapped={false} />
      </mesh>

      <mesh
        ref={meshRef}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onClick={handleClick}
      >
        <planeGeometry args={[TILE_W, TILE_H]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {hovered && (
        <Html
          position={[0, TILE_H / 2 + 0.22, 0.05]}
          center
          distanceFactor={6}
          style={{ pointerEvents: "none" }}
        >
          <span className="whitespace-nowrap rounded-sm bg-ink/85 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.06em] text-flip">
            {item.title}
          </span>
        </Html>
      )}
    </group>
  );
}

function SphereGroup({
  items,
  dragRef,
  reducedMotion,
  onSelect,
}: {
  items: DesignWork[];
  dragRef: React.RefObject<DragState>;
  reducedMotion: boolean;
  onSelect: (item: DesignWork) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useFibonacciSphere(items.length, RADIUS);

  useFrame((_, delta) => {
    const group = groupRef.current;
    const d = dragRef.current;
    if (!group || !d) return;

    if (d.dragging) {
      group.rotation.y += d.velTheta;
      group.rotation.x += d.velPhi;
    } else if (Math.abs(d.velTheta) > 0.0001 || Math.abs(d.velPhi) > 0.0001) {
      group.rotation.y += d.velTheta;
      group.rotation.x += d.velPhi;
      d.velTheta *= DAMPING;
      d.velPhi *= DAMPING;
    } else {
      d.velTheta = 0;
      d.velPhi = 0;
      if (!reducedMotion) {
        const idleFor = performance.now() - d.idleSince;
        if (idleFor > IDLE_RESUME_MS) {
          group.rotation.y += AUTO_ROTATE_SPEED * delta;
        }
      }
    }

    group.rotation.x = Math.max(-1.1, Math.min(1.1, group.rotation.x));
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <Tile key={`${item.src}-${i}`} position={positions[i]} item={item} onSelect={onSelect} />
      ))}
    </group>
  );
}

export default function GlobeScene({
  items,
  onSelect,
}: {
  items: DesignWork[];
  onSelect: (item: DesignWork) => void;
}) {
  const dragRef = useRef<DragState>({
    dragging: false,
    velTheta: 0,
    velPhi: 0,
    lastX: 0,
    lastY: 0,
    idleSince: 0,
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    d.dragging = true;
    d.lastX = e.clientX;
    d.lastY = e.clientY;
    d.velTheta = 0;
    d.velPhi = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.dragging) return;
    const dx = e.clientX - d.lastX;
    const dy = e.clientY - d.lastY;
    d.lastX = e.clientX;
    d.lastY = e.clientY;
    d.velTheta = dx * 0.005;
    d.velPhi = dy * 0.005;
  }, []);

  const endDrag = useCallback(() => {
    const d = dragRef.current;
    if (!d.dragging) return;
    d.dragging = false;
    d.idleSince = performance.now();
  }, []);

  return (
    <div
      className="h-full w-full touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <SphereGroup
            items={items}
            dragRef={dragRef}
            reducedMotion={reducedMotion}
            onSelect={onSelect}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
