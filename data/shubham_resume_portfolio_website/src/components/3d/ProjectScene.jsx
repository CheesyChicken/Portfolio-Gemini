import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';

const FloatingCards = () => {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.y = t * 0.05;
    });

    return (
        <group ref={group}>
            {[...Array(5)].map((_, i) => (
                <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={1}>
                    <mesh
                        position={[
                            Math.sin((i / 5) * Math.PI * 2) * 3,
                            Math.random() * 2 - 1,
                            Math.cos((i / 5) * Math.PI * 2) * 3
                        ]}
                        rotation={[Math.random(), Math.random(), Math.random()]}
                        scale={0.5 + Math.random() * 0.5}
                    >
                        <boxGeometry args={[1, 1.4, 0.1]} />
                        <meshStandardMaterial
                            color={['#007AFF', '#5E5CE6', '#FF2D55', '#34C759', '#FF9500'][i % 5]}
                            roughness={0.2}
                            metalness={0.1}
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const ProjectScene = () => {
    return (
        <div className="canvas-container opacity-50">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <FloatingCards />
                <Environment preset="studio" />
            </Canvas>
        </div>
    );
};

export default ProjectScene;
