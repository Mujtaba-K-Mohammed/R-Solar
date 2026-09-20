import { useMemo, useLayoutEffect, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
export default function SolarPanel() {
  const cells = useRef<THREE.InstancedMesh>(null);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const c = canvas.getContext("2d")!;
    c.fillStyle = "#132b46";
    c.fillRect(0, 0, 128, 128);
    for (let i = 4; i < 128; i += 5) {
      c.fillStyle = "rgba(143,175,196,.25)";
      c.fillRect(0, i, 128, 0.65);
    }
    for (const x of [24, 64, 104]) {
      c.fillStyle = "#7a9bae";
      c.fillRect(x, 0, 1, 128);
    }
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  useLayoutEffect(() => {
    const o = new THREE.Object3D();
    for (let y = 0; y < 12; y++)
      for (let x = 0; x < 6; x++) {
        const i = y * 6 + x;
        o.position.set((x - 2.5) * 0.342, (y - 5.5) * 0.198, 0.067);
        o.updateMatrix();
        cells.current!.setMatrixAt(i, o.matrix);
        cells.current!.setColorAt(
          i,
          new THREE.Color().setHSL(0.59, 0.3, 0.78 + (i % 5) * 0.035),
        );
      }
    cells.current!.instanceMatrix.needsUpdate = true;
    return () => texture.dispose();
  }, [texture]);
  return (
    <group scale={[1, 1.18, 1]}>
      <RoundedBox args={[2.16, 2.5, 0.105]} radius={0.025} smoothness={2}>
        <meshStandardMaterial
          color="#9ba9b5"
          metalness={0.95}
          roughness={0.27}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.055]}>
        <boxGeometry args={[2.06, 2.4, 0.01]} />
        <meshStandardMaterial color="#061322" />
      </mesh>
      <instancedMesh ref={cells} args={[undefined, undefined, 72]}>
        <boxGeometry args={[0.331, 0.187, 0.008]} />
        <meshPhysicalMaterial
          map={texture}
          metalness={0.4}
          roughness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.18}
        />
      </instancedMesh>
      <mesh position={[0, 0, 0.077]}>
        <planeGeometry args={[2.055, 2.397]} />
        <meshPhysicalMaterial
          color="#b3d8eb"
          transparent
          opacity={0.085}
          metalness={0.1}
          roughness={0.13}
          clearcoat={1}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0, -0.057]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.05, 2.39]} />
        <meshStandardMaterial color="#e5e7e8" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.65, -0.12]}>
        <boxGeometry args={[0.4, 0.2, 0.11]} />
        <meshStandardMaterial color="#171c21" />
      </mesh>
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, 0, -0.073]}>
          <boxGeometry args={[0.04, 2.35, 0.035]} />
          <meshStandardMaterial
            color="#b2bdc4"
            metalness={0.85}
            roughness={0.3}
          />
        </mesh>
      ))}
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh
            position={[side * 0.17, 0.37, -0.13]}
            rotation={[0, 0, side * 0.3]}
          >
            <cylinderGeometry args={[0.014, 0.014, 0.45, 6]} />
            <meshStandardMaterial color="#181818" />
          </mesh>
          <mesh position={[side * 0.235, 0.15, -0.13]}>
            <boxGeometry args={[0.045, 0.1, 0.04]} />
            <meshStandardMaterial color="#121212" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
