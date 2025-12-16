import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

const DistortedSphere = () => {
    const mesh = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        mesh.current.distort = 0.4 + Math.sin(t) * 0.2;
    });

    return (
        <Sphere ref={mesh} args={[1, 100, 200]} scale={2} position={[2, 0, 0]}>
            <MeshDistortMaterial
                color="#FF2D55"
                attach="material"
                distort={0.5}
                speed={2}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    );
};

const ContactScene = () => {
    return (
        <div className="canvas-container">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <DistortedSphere />
            </Canvas>
        </div>
    );
};

export default ContactScene;
