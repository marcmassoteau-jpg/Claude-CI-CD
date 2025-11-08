import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import type { ReactNode } from 'react';

interface Canvas3DProps {
  children: ReactNode;
  className?: string;
  dpr?: number;
  performance?: 'high' | 'medium' | 'low';
}

export const Canvas3D = ({
  children,
  className = '',
  dpr = 1,
  performance = 'high'
}: Canvas3DProps) => {
  const frameloop = performance === 'low' ? 'demand' : 'always';
  const shadows = performance === 'high';

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: performance !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop={frameloop}
        shadows={shadows}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};
