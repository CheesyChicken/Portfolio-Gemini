import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec3 uMouse;
  attribute float aScale;
  attribute vec3 aRandomness;
  varying vec3 vColor;

  void main() {
    vec3 pos = position;
    
    // Add some noise/flow based on time
    pos.x += sin(uTime * 0.2 + aRandomness.x * 10.0) * 0.5;
    pos.y += cos(uTime * 0.3 + aRandomness.y * 10.0) * 0.5;
    pos.z += sin(uTime * 0.1 + aRandomness.z * 10.0) * 0.5;

    // Mouse interaction (Repulsion)
    float dist = distance(pos, uMouse);
    float force = 0.0;
    if (dist < 10.0) {
      force = (10.0 - dist) / 10.0;
      vec3 dir = normalize(pos - uMouse);
      pos += dir * force * 5.0;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation
    gl_PointSize = aScale * (300.0 / -mvPosition.z);
    
    // Color variation based on position and interaction
    // Nebula Palette: Deep Purple (0.2, 0.0, 0.5) to Bright Pink (1.0, 0.2, 0.8)
    vColor = mix(vec3(0.2, 0.0, 0.5), vec3(1.0, 0.2, 0.8), force); 
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    // Circular particle
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;

    // Soft glow
    float strength = 1.0 - (dist * 2.0);
    strength = pow(strength, 2.0);

    gl_FragColor = vec4(vColor, strength);
  }
`;

const Particles = () => {
    const mesh = useRef();

    // Uniforms
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(0, 0, 0) }
    }), []);

    // Particles Data
    const count = 10000; // 10k particles
    const { positions, scales, randomness } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const randomness = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Position
            positions[i * 3] = (Math.random() - 0.5) * 50;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z

            // Scale
            scales[i] = Math.random();

            // Randomness
            randomness[i * 3] = Math.random();
            randomness[i * 3 + 1] = Math.random();
            randomness[i * 3 + 2] = Math.random();
        }

        return { positions, scales, randomness };
    }, []);

    useFrame((state) => {
        const { clock, pointer } = state;

        // Update Uniforms
        mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();

        // Smooth mouse movement
        // Pointer is normalized (-1 to 1), convert to world space roughly
        const targetX = pointer.x * 25;
        const targetY = pointer.y * 15;

        mesh.current.material.uniforms.uMouse.value.x += (targetX - mesh.current.material.uniforms.uMouse.value.x) * 0.1;
        mesh.current.material.uniforms.uMouse.value.y += (targetY - mesh.current.material.uniforms.uMouse.value.y) * 0.1;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    count={count}
                    array={scales}
                    itemSize={1}
                />
                <bufferAttribute
                    attach="attributes-aRandomness"
                    count={count}
                    array={randomness}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexColors={true}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </points>
    );
};

const ParticleSystem = () => {
    return (
        <div className="w-full h-screen bg-black">
            <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
                <Particles />
            </Canvas>

            <div className="absolute bottom-10 left-10 text-white pointer-events-none">
                <h1 className="text-4xl font-bold mb-2">Nebula AI</h1>
                <p className="opacity-70">Interactive Particle System • GPU Accelerated</p>
            </div>
        </div>
    );
};

export default ParticleSystem;
