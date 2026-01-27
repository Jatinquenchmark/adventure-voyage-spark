import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Realistic airplane model
const Airplane = ({ 
  orbitRadius, 
  speed, 
  startAngle, 
  tiltX,
  tiltZ,
  color,
  scale = 1
}: { 
  orbitRadius: number; 
  speed: number; 
  startAngle: number; 
  tiltX: number;
  tiltZ: number;
  color: string;
  scale?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * speed + startAngle;
      
      // Calculate position on tilted orbit
      const x = Math.cos(t) * orbitRadius;
      const baseY = Math.sin(t) * orbitRadius * Math.sin(tiltX);
      const z = Math.sin(t) * orbitRadius * Math.cos(tiltX);
      
      groupRef.current.position.set(x, baseY, z);
      
      // Rotate plane to face direction of travel
      groupRef.current.rotation.y = -t + Math.PI;
      groupRef.current.rotation.z = Math.sin(t) * 0.2;
      groupRef.current.rotation.x = tiltX * Math.cos(t);
    }
    
    if (trailRef.current && trailRef.current.material instanceof THREE.MeshBasicMaterial) {
      trailRef.current.material.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Fuselage */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.35, 8]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Nose cone */}
      <mesh position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.04, 0.12, 8]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Main wings */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.5, 0.015, 0.12]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Tail fin vertical */}
      <mesh position={[0, 0.08, 0.15]}>
        <boxGeometry args={[0.01, 0.12, 0.08]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Tail wings horizontal */}
      <mesh position={[0, 0.02, 0.15]}>
        <boxGeometry args={[0.18, 0.01, 0.06]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Engine glow left */}
      <mesh position={[-0.12, -0.02, 0.08]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color="#ff6b35" />
      </mesh>
      
      {/* Engine glow right */}
      <mesh position={[0.12, -0.02, 0.08]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color="#ff6b35" />
      </mesh>
      
      {/* Contrail */}
      <mesh ref={trailRef} position={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.02, 0.08, 0.4, 8]} />
        <meshBasicMaterial color="white" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// Orbit ring visualization
const OrbitRing = ({ radius, tiltX, color = '#ffffff' }: { radius: number; tiltX: number; color?: string }) => {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * Math.sin(tiltX);
      const z = Math.sin(angle) * radius * Math.cos(tiltX);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [radius, tiltX]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({ 
      color, 
      opacity: 0.15, 
      transparent: true,
      linewidth: 1
    });
  }, [color]);

  return <primitive object={new THREE.Line(lineGeometry, lineMaterial)} />;
};

// Beautiful Earth with shader-based appearance
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = time * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.03;
    }
  });

  return (
    <group>
      {/* Ocean base */}
      <Sphere ref={earthRef} args={[1.5, 64, 64]}>
        <meshPhongMaterial
          color="#0a4d8c"
          emissive="#001a33"
          emissiveIntensity={0.1}
          shininess={25}
        />
      </Sphere>
      
      {/* Continents - using a layered approach */}
      <Sphere args={[1.502, 64, 64]} rotation={[0, 2, 0]}>
        <meshPhongMaterial
          color="#2d8a4e"
          transparent
          opacity={0.9}
          emissive="#0d3d1f"
          emissiveIntensity={0.05}
        />
      </Sphere>
      
      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[1.52, 48, 48]}>
        <meshPhongMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          emissive="#ffffff"
          emissiveIntensity={0.02}
        />
      </Sphere>
      
      {/* Atmosphere inner glow */}
      <Sphere args={[1.55, 32, 32]}>
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Atmosphere outer glow */}
      <Sphere ref={atmosphereRef} args={[1.7, 32, 32]}>
        <meshBasicMaterial
          color="#87ceeb"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* City lights effect */}
      <CityLights />
    </group>
  );
};

// City lights on the globe
const CityLights = () => {
  const lightsData = useMemo(() => [
    { lat: 40.7, lon: -74, size: 0.03 },    // New York
    { lat: 51.5, lon: 0, size: 0.03 },       // London
    { lat: 35.7, lon: 139.7, size: 0.03 },   // Tokyo
    { lat: 28.6, lon: 77.2, size: 0.025 },   // Delhi
    { lat: 31.2, lon: 121.5, size: 0.03 },   // Shanghai
    { lat: -23.5, lon: -46.6, size: 0.025 }, // São Paulo
    { lat: 48.9, lon: 2.3, size: 0.025 },    // Paris
    { lat: 19.4, lon: -99.1, size: 0.025 },  // Mexico City
    { lat: 1.3, lon: 103.8, size: 0.02 },    // Singapore
    { lat: -33.9, lon: 151.2, size: 0.02 },  // Sydney
    { lat: 25.2, lon: 55.3, size: 0.02 },    // Dubai
    { lat: 55.8, lon: 37.6, size: 0.025 },   // Moscow
  ], []);

  return (
    <group>
      {lightsData.map((city, i) => {
        const phi = (90 - city.lat) * (Math.PI / 180);
        const theta = (city.lon + 180) * (Math.PI / 180);
        const x = -1.51 * Math.sin(phi) * Math.cos(theta);
        const y = 1.51 * Math.cos(phi);
        const z = 1.51 * Math.sin(phi) * Math.sin(theta);
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[city.size, 8, 8]} />
            <meshBasicMaterial color="#ffd700" transparent opacity={0.8} />
          </mesh>
        );
      })}
    </group>
  );
};

// Starfield background
const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  const [positions, sizes] = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const r = 25 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 0.08 + 0.02;
    }
    return [positions, sizes];
  }, []);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        color="#ffffff" 
        transparent 
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Main scene
const Scene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[5, 3, 5]} 
        intensity={1.2} 
        color="#ffffff"
      />
      <pointLight position={[-10, 5, -10]} intensity={0.3} color="#4da6ff" />
      <pointLight position={[10, -5, 10]} intensity={0.2} color="#ffa500" />
      
      {/* Stars background */}
      <Stars />
      
      {/* Earth */}
      <Earth />
      
      {/* Orbit rings */}
      <OrbitRing radius={2.2} tiltX={0.3} color="#f97316" />
      <OrbitRing radius={2.6} tiltX={-0.4} color="#60a5fa" />
      <OrbitRing radius={3.0} tiltX={0.5} color="#22c55e" />
      <OrbitRing radius={2.4} tiltX={-0.2} color="#a855f7" />
      
      {/* Airplanes */}
      <Airplane 
        orbitRadius={2.2} 
        speed={0.4} 
        startAngle={0} 
        tiltX={0.3}
        tiltZ={0}
        color="#ffffff"
        scale={1.2}
      />
      <Airplane 
        orbitRadius={2.6} 
        speed={0.35} 
        startAngle={Math.PI * 0.6} 
        tiltX={-0.4}
        tiltZ={0.1}
        color="#e0e0e0"
        scale={1}
      />
      <Airplane 
        orbitRadius={3.0} 
        speed={0.25} 
        startAngle={Math.PI * 1.2} 
        tiltX={0.5}
        tiltZ={-0.1}
        color="#ffffff"
        scale={1.1}
      />
      <Airplane 
        orbitRadius={2.4} 
        speed={0.45} 
        startAngle={Math.PI * 1.7} 
        tiltX={-0.2}
        tiltZ={0}
        color="#f0f0f0"
        scale={0.9}
      />
      
      {/* Camera controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
};

export const Globe3D = () => {
  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[600px]">
      <Canvas
        camera={{ position: [0, 1, 7], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
