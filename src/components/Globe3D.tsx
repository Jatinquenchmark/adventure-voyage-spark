import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Realistic airplane model
const Airplane = ({ 
  orbitRadius, 
  speed, 
  startAngle, 
  tiltX,
  color,
  scale = 1
}: { 
  orbitRadius: number; 
  speed: number; 
  startAngle: number; 
  tiltX: number;
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

// Textured Earth with NASA satellite imagery
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const nightRef = useRef<THREE.Mesh>(null);

  // Load NASA textures
  const [dayTexture, cloudsTexture, nightTexture] = useLoader(THREE.TextureLoader, [
    '/textures/earth-daymap.jpg',
    '/textures/earth-clouds.jpg',
    '/textures/earth-nightmap.jpg'
  ]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = time * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.06;
    }
    if (nightRef.current) {
      nightRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group>
      {/* Main Earth with day texture */}
      <Sphere ref={earthRef} args={[1.5, 64, 64]}>
        <meshPhongMaterial
          map={dayTexture}
          bumpScale={0.05}
          specular={new THREE.Color('#333333')}
          shininess={5}
        />
      </Sphere>
      
      {/* Night lights layer (slightly smaller to peek through) */}
      <Sphere ref={nightRef} args={[1.498, 64, 64]}>
        <meshBasicMaterial
          map={nightTexture}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      
      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[1.52, 48, 48]}>
        <meshPhongMaterial
          map={cloudsTexture}
          transparent
          opacity={0.35}
          depthWrite={false}
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
      <Sphere args={[1.7, 32, 32]}>
        <meshBasicMaterial
          color="#87ceeb"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Atmosphere rim light */}
      <Sphere args={[1.58, 32, 32]}>
        <shaderMaterial
          transparent
          uniforms={{
            glowColor: { value: new THREE.Color('#4da6ff') },
            viewVector: { value: new THREE.Vector3(0, 0, 5) }
          }}
          vertexShader={`
            varying float intensity;
            void main() {
              vec3 vNormal = normalize(normalMatrix * normal);
              vec3 vNormel = normalize(vec3(0.0, 0.0, 1.0));
              intensity = pow(0.7 - dot(vNormal, vNormel), 2.0);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 glowColor;
            varying float intensity;
            void main() {
              vec3 glow = glowColor * intensity;
              gl_FragColor = vec4(glow, intensity * 0.5);
            }
          `}
          side={THREE.FrontSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
};

// Starfield background
const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  const [positions] = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const r = 30 + Math.random() * 30;
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
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.003;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={3000}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        color="#ffffff" 
        transparent 
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
};

// Loading fallback
const LoadingEarth = () => (
  <Sphere args={[1.5, 32, 32]}>
    <meshBasicMaterial color="#1a365d" wireframe />
  </Sphere>
);

// Main scene
const Scene = () => {
  return (
    <>
      {/* Lighting setup for realistic Earth */}
      <ambientLight intensity={0.15} />
      <directionalLight 
        position={[5, 3, 5]} 
        intensity={1.5} 
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-10, 0, -10]} intensity={0.3} color="#4da6ff" />
      <hemisphereLight args={['#4da6ff', '#1a365d', 0.3]} />
      
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
        color="#ffffff"
        scale={1.2}
      />
      <Airplane 
        orbitRadius={2.6} 
        speed={0.35} 
        startAngle={Math.PI * 0.6} 
        tiltX={-0.4}
        color="#e0e0e0"
        scale={1}
      />
      <Airplane 
        orbitRadius={3.0} 
        speed={0.25} 
        startAngle={Math.PI * 1.2} 
        tiltX={0.5}
        color="#ffffff"
        scale={1.1}
      />
      <Airplane 
        orbitRadius={2.4} 
        speed={0.45} 
        startAngle={Math.PI * 1.7} 
        tiltX={-0.2}
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
