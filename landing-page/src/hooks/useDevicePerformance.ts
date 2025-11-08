import { useState, useEffect } from 'react';

interface DevicePerformance {
  tier: 'high' | 'medium' | 'low';
  supportsWebGL: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
}

export const useDevicePerformance = (): DevicePerformance => {
  const [performance, setPerformance] = useState<DevicePerformance>({
    tier: 'high',
    supportsWebGL: true,
    isMobile: false,
    reducedMotion: false,
  });

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const supportsWebGL = !!gl;

    // Check device type
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Check reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Estimate performance tier
    let tier: 'high' | 'medium' | 'low' = 'high';

    // Use hardware concurrency as a rough measure
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 8;

    if (isMobile || cores < 4 || memory < 4) {
      tier = 'low';
    } else if (cores < 8 || memory < 8) {
      tier = 'medium';
    }

    setPerformance({
      tier,
      supportsWebGL,
      isMobile,
      reducedMotion,
    });
  }, []);

  return performance;
};
