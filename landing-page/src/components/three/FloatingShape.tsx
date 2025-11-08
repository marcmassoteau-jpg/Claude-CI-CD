import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import type * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: 'sphere' | 'torus' | 'box' | 'octahedron';
  color: string;
  speed?: number;
  scale?: number;
}

export const FloatingShape = ({
  position,
  geometry,
  color,
  speed = 1,
  scale = 1
}: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    timeRef.current += delta * speed;

    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(timeRef.current) * 0.5;

    // Rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;

    // Subtle scale pulsing
    const scaleMultiplier = 1 + Math.sin(timeRef.current * 2) * 0.1;
    meshRef.current.scale.setScalar(scale * scaleMultiplier);
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case 'box':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1.2]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      <MeshTransmissionMaterial
        color={color}
        transmission={0.9}
        thickness={0.5}
        roughness={0.2}
        metalness={0.1}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};
