import { Environment, Lightformer } from "@react-three/drei";
export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 5, 5]} intensity={3.2} color="#ffefd2" />
      <directionalLight position={[-4, 1, 2]} intensity={1.8} color="#97caff" />
      <Environment resolution={64}>
        <Lightformer
          position={[0, 3, 4]}
          scale={[6, 2, 1]}
          intensity={3}
          color="#dcefff"
        />
        <Lightformer position={[-4, 0, 3]} scale={[1, 5, 1]} intensity={2} />
      </Environment>
    </>
  );
}
