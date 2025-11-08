import { Environment, PerspectiveCamera } from '@react-three/drei';
import { FloatingShape } from './FloatingShape';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

interface GeometricBackgroundProps {
  mouseX: number;
  mouseY: number;
  performance: 'high' | 'medium' | 'low';
}

export const GeometricBackground = ({
  mouseX,
  mouseY,
  performance
}: GeometricBackgroundProps) => {
  const { camera } = useThree();

  // Mouse parallax effect
  useEffect(() => {
    if (performance === 'low') return;

    camera.position.x = mouseX * 2;
    camera.position.y = -mouseY * 2;
    camera.lookAt(0, 0, 0);
  }, [mouseX, mouseY, camera, performance]);

  // Reduce shapes on lower performance
  const shapeCount = performance === 'high' ? 6 : performance === 'medium' ? 4 : 3;

  const shapes: Array<{
    position: [number, number, number];
    geometry: 'sphere' | 'torus' | 'box' | 'octahedron';
    color: string;
    speed: number;
    scale: number;
  }> = [
    { position: [-3, 0, -2] as [number, number, number], geometry: 'sphere' as const, color: '#a855f7', speed: 0.8, scale: 0.8 },
    { position: [3, -1, -3] as [number, number, number], geometry: 'torus' as const, color: '#ec4899', speed: 1.2, scale: 0.6 },
    { position: [0, 2, -5] as [number, number, number], geometry: 'octahedron' as const, color: '#8b5cf6', speed: 1.0, scale: 0.7 },
    { position: [-2, -2, -4] as [number, number, number], geometry: 'box' as const, color: '#d946ef', speed: 0.9, scale: 0.5 },
    { position: [2, 1, -1] as [number, number, number], geometry: 'sphere' as const, color: '#c026d3', speed: 1.1, scale: 0.6 },
    { position: [-1, 3, -6] as [number, number, number], geometry: 'torus' as const, color: '#6366f1', speed: 0.7, scale: 0.8 },
  ].slice(0, shapeCount);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />

      {/* Environment map for reflections */}
      {performance === 'high' && (
        <Environment preset="city" />
      )}

      {/* Floating shapes */}
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
    </>
  );
};
