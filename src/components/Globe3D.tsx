import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Animated plane orbiting the globe
const OrbitingPlane = ({ 
  orbitRadius, 
  speed, 
  startAngle, 
  tilt, 
  color 
}: { 
  orbitRadius: number; 
  speed: number; 
  startAngle: number; 
  tilt: number;
  color: string;
}) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + startAngle;
      ref.current.position.x = Math.cos(t) * orbitRadius;
      ref.current.position.z = Math.sin(t) * orbitRadius;
      ref.current.position.y = Math.sin(t * 0.5) * tilt;
      ref.current.rotation.y = -t + Math.PI / 2;
    }
  });

  return (
    <group ref={ref}>
      {/* Plane body */}
      <mesh>
        <coneGeometry args={[0.08, 0.25, 4]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Wings */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 0.3, 0.08]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Trail */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

// Orbit path visualization
const OrbitPath = ({ radius, tilt }: { radius: number; tilt: number }) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 0.5) * tilt,
        Math.sin(angle) * radius
      ));
    }
    return pts;
  }, [radius, tilt]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: '#f97316', opacity: 0.2, transparent: true }))} />
  );
};

// Main rotating Earth globe
const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <group>
      {/* Earth sphere */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#1e3a5f"
          metalness={0.1}
          roughness={0.8}
        />
      </Sphere>
      
      {/* Continents layer */}
      <Sphere ref={cloudsRef} args={[1.01, 64, 64]}>
        <meshStandardMaterial
          color="#2d5a3d"
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={0.7}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[1.15, 32, 32]}>
        <meshStandardMaterial
          color="#60a5fa"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Glowing rim */}
      <Sphere args={[1.05, 32, 32]}>
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Location markers */}
      <LocationMarker position={[0.7, 0.5, 0.5]} />
      <LocationMarker position={[-0.5, 0.7, 0.5]} />
      <LocationMarker position={[0.3, -0.4, 0.85]} />
      <LocationMarker position={[-0.8, 0.2, 0.5]} />
      <LocationMarker position={[0.5, 0.3, -0.8]} />
    </group>
  );
};

// Pulsing location marker
const LocationMarker = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.3;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshBasicMaterial color="#f97316" />
    </mesh>
  );
};

// Stars background
const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  const [positions] = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      const r = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return [positions];
  }, []);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
};

// Scene component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#60a5fa" />
      
      <Stars />
      <Earth />
      
      {/* Orbit paths */}
      <OrbitPath radius={1.8} tilt={0.3} />
      <OrbitPath radius={2.2} tilt={-0.2} />
      <OrbitPath radius={2.5} tilt={0.4} />
      
      {/* Orbiting planes */}
      <OrbitingPlane orbitRadius={1.8} speed={0.5} startAngle={0} tilt={0.3} color="#f97316" />
      <OrbitingPlane orbitRadius={2.2} speed={0.4} startAngle={Math.PI * 0.7} tilt={-0.2} color="#60a5fa" />
      <OrbitingPlane orbitRadius={2.5} speed={0.3} startAngle={Math.PI * 1.3} tilt={0.4} color="#22c55e" />
      <OrbitingPlane orbitRadius={1.8} speed={0.45} startAngle={Math.PI} tilt={0.3} color="#a855f7" />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
};

export const Globe3D = () => {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
