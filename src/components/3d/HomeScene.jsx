import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';

const Geometries = () => {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.x = Math.cos(t / 4) / 8;
        group.current.rotation.y = Math.sin(t / 4) / 8;
        group.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    });

    return (
        <group ref={group}>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[2, 1, 0]} scale={0.8}>
                    <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                    <meshStandardMaterial color="#007AFF" roughness={0.1} metalness={0.8} />
                </mesh>
            </Float>

            <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
                <mesh position={[-2, -1, -1]} scale={0.6}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#5E5CE6" roughness={0.1} metalness={0.8} />
                </mesh>
            </Float>

            <Float speed={1} rotationIntensity={2} floatIntensity={1}>
                <mesh position={[0, 2, -2]} scale={0.5}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#FF2D55" roughness={0.1} metalness={0.8} />
                </mesh>
            </Float>
        </group>
    );
};

const HomeScene = () => {
    return (
        <div className="canvas-container">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <Geometries />
                <Environment preset="city" />
                <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
            </Canvas>
        </div>
    );
};

export default HomeScene;
