import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SolarPanel from "./SolarPanel";
import Lighting from "./Lighting";
import { useReducedMotion } from "../../hooks/useReducedMotion";
gsap.registerPlugin(ScrollTrigger);

function Assembly({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const sunlight = useRef<THREE.DirectionalLight>(null);
  const neutralPointer = useRef(new THREE.Vector2());
  const progress = useRef({ value: 0 });
  const elapsed = useRef(0);
  const fine = useRef(matchMedia("(pointer:fine)").matches);
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(progress.current, {
        value: 1,
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, [reduced]);
  useFrame((state, delta) => {
    if (!group.current) return;
    elapsed.current += Math.min(delta, 0.05);
    const t = elapsed.current;
    const entrance = reduced ? 1 : 1 - Math.exp(-t * 1.5);
    const p = reduced ? 0 : progress.current.value;
    if (sunlight.current) sunlight.current.intensity = 0.65 + p * 0.35;
    const pointer =
      fine.current && !reduced ? state.pointer : neutralPointer.current;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      0.13 +
        pointer.y * 0.06 +
        (reduced ? 0 : Math.sin(t * 0.3) * 0.018) +
        p * 0.15,
      3,
      delta,
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      -0.42 + pointer.x * 0.09 + (1 - entrance) * 0.35 + p * 0.28,
      3,
      delta,
    );
    group.current.rotation.z =
      0.12 + (reduced ? 0 : Math.sin(t * 0.25) * 0.013);
    group.current.position.y =
      (reduced ? 0 : Math.sin(t * 0.65) * 0.04) - (1 - entrance) * 0.25;
    group.current.scale.setScalar(0.78 + 0.22 * entrance);
    state.camera.position.z = 5 + p * 0.65 + (1 - entrance) * 0.6;
  });
  return (
    <>
      <directionalLight
        ref={sunlight}
        position={[2, 4, 4]}
        color="#ffe1a4"
        intensity={0.65}
      />
      <group ref={group} rotation={[0.13, -0.42, 0.12]}>
        <SolarPanel />
      </group>
    </>
  );
}
export default function SolarScene() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const hero = document.getElementById("home")!;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(hero);
    const visibility = () =>
      setVisible(!document.hidden && hero.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <Canvas
      dpr={[1, matchMedia("(max-width:768px)").matches ? 1 : 1.5]}
      frameloop={!visible || reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", () => {
          gl.domElement.style.visibility = "hidden";
        });
      }}
    >
      <Suspense fallback={null}>
        <Lighting />
        <Assembly reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
