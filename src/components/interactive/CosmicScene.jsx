import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { ParticleShapeType } from './CosmicTypes';

const PARTICLE_COUNT = 8000;

// --- Math Generators ---

const generateHeart = (i, count) => {
    const t = (i / count) * Math.PI * 2 * 50; // Multiple loops
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const z = (Math.random() - 0.5) * 10; // Thickness
    return new THREE.Vector3(x * 0.5, y * 0.5, z);
};

const generateFlower = (i, count) => {
    // Rose curve in polar coords converted to 3D
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const k = 4; // Petals
    const r = 10 * Math.sin(k * theta) * Math.sin(phi);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi);
    const z = r * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
};

const generateSaturn = (i, count) => {
    // Mix of Sphere and Ring
    const isRing = i > count * 0.3; // 70% ring
    if (isRing) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 12 + Math.random() * 8;
        return new THREE.Vector3(Math.cos(angle) * dist, (Math.random() - 0.5) * 0.5, Math.sin(angle) * dist);
    } else {
        // Planet
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = 8;
        return new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
    }
};

const generateBuddha = (i, count) => {
    // Approximate a seated figure with 3 spheres
    const r = Math.random();
    let pos = new THREE.Vector3();

    if (i < count * 0.2) {
        // Head
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const rad = 2.5;
        pos.set(rad * Math.sin(phi) * Math.cos(theta), rad * Math.sin(phi) * Math.sin(theta) + 8, rad * Math.cos(phi));
    } else if (i < count * 0.5) {
        // Torso
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const rad = 4.5;
        pos.set(rad * Math.sin(phi) * Math.cos(theta), rad * Math.sin(phi) * Math.sin(theta) + 2, rad * Math.cos(phi));
    } else {
        // Base/Legs (Flattened sphere)
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 7;
        const height = (Math.random() - 0.5) * 3 - 4;
        pos.set(Math.cos(angle) * dist, height, Math.sin(angle) * dist);
    }
    return pos;
};

const generateFireworks = (i, count) => {
    // Sphere burst
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = Math.random() * 2; // Start small, expansion handles the rest
    return new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
};


const generateTextPoints = (text, count) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 1. Measure text first
    ctx.font = 'bold 100px Arial'; // Higher resolution
    const metrics = ctx.measureText(text);
    const textWidth = Math.ceil(metrics.width);
    const textHeight = 120; // Approximate height for 100px font

    // 2. Set canvas size with some padding
    canvas.width = textWidth + 40;
    canvas.height = textHeight + 40;

    // 3. Draw text
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 100px Arial'; // Re-set font after resize
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const validPoints = [];

    // 4. Scan for points
    // Step size depends on canvas size to keep performance steady
    const step = Math.max(1, Math.floor(canvas.width / 200));

    for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
            const i = (y * canvas.width + x) * 4;
            if (data[i] > 128) {
                // Map to 3D space
                // Center the text
                const px = (x - canvas.width / 2);
                const py = -(y - canvas.height / 2);
                validPoints.push(new THREE.Vector3(px, py, 0));
            }
        }
    }

    // If no points found
    if (validPoints.length === 0) return generateFireworks(0, 1);

    // 5. Normalize and Scale to fit in view
    // We want the text to be roughly width 40 units in 3D space
    const scale = 40 / canvas.width;

    const result = [];
    for (let i = 0; i < count; i++) {
        const p = validPoints[Math.floor(Math.random() * validPoints.length)];
        result.push(new THREE.Vector3(
            p.x * scale + (Math.random() - 0.5) * 0.5,
            p.y * scale + (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 2
        ));
    }
    return result;
};


export const CosmicScene = ({ shape, color, expansion, text = "AURA", cameraPosition, cameraRotation }) => {
    const pointsRef = useRef(null);
    const bgRef = useRef(null);
    const groupRef = useRef(null);

    // Buffers for animation
    const currentPositions = useRef(new Float32Array(PARTICLE_COUNT * 3));
    const targetPositions = useRef(new Float32Array(PARTICLE_COUNT * 3));

    // Generate target geometry based on selected shape
    useEffect(() => {
        const arr = targetPositions.current;

        // Pre-calculate text points if needed
        let textPoints = [];
        if (shape === ParticleShapeType.TEXT) {
            textPoints = generateTextPoints(text, PARTICLE_COUNT);
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            let vec = new THREE.Vector3();
            switch (shape) {
                case ParticleShapeType.HEART: vec = generateHeart(i, PARTICLE_COUNT); break;
                case ParticleShapeType.FLOWER: vec = generateFlower(i, PARTICLE_COUNT); break;
                case ParticleShapeType.SATURN: vec = generateSaturn(i, PARTICLE_COUNT); break;
                case ParticleShapeType.BUDDHA: vec = generateBuddha(i, PARTICLE_COUNT); break;
                case ParticleShapeType.FIREWORKS: vec = generateFireworks(i, PARTICLE_COUNT); break;
                case ParticleShapeType.TEXT: vec = textPoints[i]; break;
                default: vec = generateSaturn(i, PARTICLE_COUNT); break;
            }
            arr[i * 3] = vec.x;
            arr[i * 3 + 1] = vec.y;
            arr[i * 3 + 2] = vec.z;
        }
    }, [shape, text]);

    // Initial random layout
    useMemo(() => {
        const arr = currentPositions.current;
        for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 50;
        }
    }, []);

    // Velocities for Chaos mode
    const velocities = useRef(new Float32Array(PARTICLE_COUNT * 3));

    // Initialize velocities once
    useMemo(() => {
        const v = velocities.current;
        for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
            v[i] = (Math.random() - 0.5) * 0.2; // Random speed
        }
    }, []);

    useFrame((state) => {
        // Update camera position smoothly
        if (cameraPosition) {
            state.camera.position.lerp(
                new THREE.Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z),
                0.1
            );
            state.camera.updateProjectionMatrix();
        }

        // Apply rotation to the particle group
        if (groupRef.current && cameraRotation !== undefined) {
            groupRef.current.rotation.y = cameraRotation;
        }

        // Parallax logic: Background follows camera partially to create infinite depth illusion
        if (bgRef.current) {
            bgRef.current.position.copy(state.camera.position).multiplyScalar(0.85);
        }

        // Particle logic
        if (!pointsRef.current) return;

        const positions = pointsRef.current.geometry.attributes.position.array;
        const targets = targetPositions.current;
        const v = velocities.current;

        // Scale modifier based on 'expansion' state (0.0 to 1.0)
        let scaleFactor = 0.5 + (expansion * 1.5);
        if (shape === ParticleShapeType.FIREWORKS) scaleFactor = 0.2 + (expansion * 8.0);

        // Lerp Speed
        const speed = 0.05;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            if (shape === ParticleShapeType.CHAOS) {
                // Chaos Mode: Move by velocity
                positions[ix] += v[ix];
                positions[iy] += v[iy];
                positions[iz] += v[iz];

                // Boundary check (wrap around)
                if (Math.abs(positions[ix]) > 30) positions[ix] *= -0.9;
                if (Math.abs(positions[iy]) > 30) positions[iy] *= -0.9;
                if (Math.abs(positions[iz]) > 30) positions[iz] *= -0.9;

                // Add slight noise to velocity
                v[ix] += (Math.random() - 0.5) * 0.01;
                v[iy] += (Math.random() - 0.5) * 0.01;
                v[iz] += (Math.random() - 0.5) * 0.01;

                // Dampen velocity
                v[ix] *= 0.99;
                v[iy] *= 0.99;
                v[iz] *= 0.99;

            } else {
                // Structured Mode: Lerp to target
                const tx = targets[ix] * scaleFactor;
                const ty = targets[iy] * scaleFactor;
                const tz = targets[iz] * scaleFactor;

                positions[ix] += (tx - positions[ix]) * speed;
                positions[iy] += (ty - positions[iy]) * speed;
                positions[iz] += (tz - positions[iz]) * speed;

                // Add slight noise/jitter for "life"
                if (expansion > 0.5) {
                    positions[ix] += (Math.random() - 0.5) * 0.05;
                    positions[iy] += (Math.random() - 0.5) * 0.05;
                    positions[iz] += (Math.random() - 0.5) * 0.05;
                }
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Rotate the whole system slowly when not in gesture mode
        if (!cameraRotation) {
            pointsRef.current.rotation.y += 0.002;
        }
    });

    return (
        <>
            <color attach="background" args={['#050505']} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* Background Group with Parallax */}
            <group ref={bgRef}>
                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={200} scale={40} size={5} speed={0.4} opacity={0.2} color="#ffffff" />
            </group>

            <group ref={groupRef}>
                <points ref={pointsRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={PARTICLE_COUNT}
                            array={currentPositions.current}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.15}
                        color={color}
                        transparent
                        opacity={0.8}
                        sizeAttenuation
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </points>
            </group>

            <OrbitControls 
                enableZoom={true} 
                enablePan={true} 
                autoRotate={!cameraRotation} 
                autoRotateSpeed={0.5} 
            />
        </>
    );
};
