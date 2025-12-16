import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { CosmicScene } from '../components/interactive/CosmicScene';
import GestureController from '../components/interactive/GestureController';
import { ParticleShapeType } from '../components/interactive/CosmicTypes';
import { Heart, Flower, Globe, User, Zap, Video, VideoOff } from 'lucide-react';


const Interactive = () => {
    const [shape, setShape] = useState(ParticleShapeType.CHAOS); // Default to Chaos
    const [color, setColor] = useState('#6366f1'); // Indigo default
    const [expansion, setExpansion] = useState(0.5);
    const [gestureMode, setGestureMode] = useState(false);
    const [lastGestureTime, setLastGestureTime] = useState(0);
    const [handPresent, setHandPresent] = useState(false);
    const [text, setText] = useState("AURA");
    const [inputText, setInputText] = useState("");
    
    // New states for camera control
    const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 30 });
    const [cameraRotation, setCameraRotation] = useState(0);
    
    // Mouse/trackpad gesture states
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const [isPinching, setIsPinching] = useState(false);

    const shapes = [
        { type: ParticleShapeType.HEART, icon: Heart, label: 'Heart' },
        { type: ParticleShapeType.FLOWER, icon: Flower, label: 'Flower' },
        { type: ParticleShapeType.SATURN, icon: Globe, label: 'Saturn' },
        { type: ParticleShapeType.BUDDHA, icon: User, label: 'Spirit' },
        { type: ParticleShapeType.FIREWORKS, icon: Zap, label: 'Fireworks' },
    ];

    // Morph to Text Logic
    const morphToText = (newText) => {
        if (!newText.trim()) return;
        setText(newText.toUpperCase());
        setShape(ParticleShapeType.TEXT);

        // Revert to Chaos after 4 seconds
        setTimeout(() => {
            setShape(ParticleShapeType.CHAOS);
        }, 4000);
    };

    // Smooth gesture updates
    const handleGestureUpdate = useCallback((gestureData) => {
        setLastGestureTime(Date.now());

        if (gestureData.hasHand) {
            if (!handPresent) {
                // Hand just appeared: Pick a random structured shape
                const randomShape = shapes[Math.floor(Math.random() * shapes.length)].type;
                setShape(randomShape);
                setHandPresent(true);
            }

            // Smooth interpolation for expansion
            setExpansion(prev => {
                const diff = gestureData.expansion - prev;
                return prev + diff * 0.1;
            });

            // Update camera position based on hand movement (pan)
            if (gestureData.delta) {
                setCameraPosition(prev => ({
                    x: prev.x + gestureData.delta.x * 0.05,
                    y: prev.y - gestureData.delta.y * 0.05, // Invert Y for natural movement
                    z: prev.z
                }));
            }

            // Update camera zoom based on pinch
            if (gestureData.zoom) {
                setCameraPosition(prev => ({
                    ...prev,
                    z: Math.max(10, Math.min(50, prev.z - gestureData.zoom * 5))
                }));
            }

            // Update rotation based on swipe
            if (gestureData.rotation) {
                setCameraRotation(prev => prev + gestureData.rotation);
            }
        } else {
            if (handPresent) {
                // Hand lost: Revert to Chaos
                setShape(ParticleShapeType.CHAOS);
                setHandPresent(false);
            }
        }
    }, [handPresent, shapes]);

    // Reset camera position when gesture mode is toggled off
    useEffect(() => {
        if (!gestureMode) {
            setCameraPosition({ x: 0, y: 0, z: 30 });
            setCameraRotation(0);
        }
    }, [gestureMode]);

    // Reset expansion to default if no gesture for a while
    useEffect(() => {
        const interval = setInterval(() => {
            if (gestureMode && Date.now() - lastGestureTime > 2000 && !handPresent) {
                // Ensure we are in Chaos if no hand for 2s
                if (shape !== ParticleShapeType.CHAOS) {
                    setShape(ParticleShapeType.CHAOS);
                    setHandPresent(false);
                }
            }
        }, 100);
        return () => clearInterval(interval);
    }, [gestureMode, lastGestureTime, handPresent, shape]);

    // Mouse/trackpad gesture handlers
    const handleMouseDown = useCallback((e) => {
        if (!gestureMode) return;
        setIsMouseDown(true);
        setLastMousePos({ x: e.clientX, y: e.clientY });
    }, [gestureMode]);

    const handleMouseMove = useCallback((e) => {
        if (!gestureMode || !isMouseDown) return;
        
        const deltaX = e.clientX - lastMousePos.x;
        const deltaY = e.clientY - lastMousePos.y;

        // Pan camera
        setCameraPosition(prev => ({
            x: prev.x + deltaX * 0.05,
            y: prev.y - deltaY * 0.05,
            z: prev.z
        }));

        // Horizontal swipe for rotation
        if (Math.abs(deltaX) > 5) {
            setCameraRotation(prev => prev + deltaX * 0.01);
        }

        setLastMousePos({ x: e.clientX, y: e.clientY });
    }, [gestureMode, isMouseDown, lastMousePos]);

    const handleMouseUp = useCallback(() => {
        setIsMouseDown(false);
    }, []);

    const handleWheel = useCallback((e) => {
        if (!gestureMode) return;
        e.preventDefault();
        
        // Zoom with scroll wheel
        setCameraPosition(prev => ({
            ...prev,
            z: Math.max(10, Math.min(50, prev.z + e.deltaY * 0.05))
        }));

        // Ctrl/Cmd + scroll for expansion control
        if (e.ctrlKey || e.metaKey) {
            setExpansion(prev => Math.max(0, Math.min(1, prev - e.deltaY * 0.001)));
        }
    }, [gestureMode]);

    // Trackpad pinch gesture (for Safari/macOS)
    const handleGestureStart = useCallback((e) => {
        if (!gestureMode) return;
        e.preventDefault();
        setIsPinching(true);
    }, [gestureMode]);

    const handleGestureChange = useCallback((e) => {
        if (!gestureMode || !isPinching) return;
        e.preventDefault();
        
        // Zoom with pinch
        const scale = e.scale;
        setCameraPosition(prev => ({
            ...prev,
            z: Math.max(10, Math.min(50, prev.z / scale))
        }));
    }, [gestureMode, isPinching]);

    const handleGestureEnd = useCallback(() => {
        setIsPinching(false);
    }, []);

    // Attach mouse/trackpad listeners
    useEffect(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('wheel', handleWheel, { passive: false });
        
        // Safari trackpad gestures
        canvas.addEventListener('gesturestart', handleGestureStart);
        canvas.addEventListener('gesturechange', handleGestureChange);
        canvas.addEventListener('gestureend', handleGestureEnd);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('wheel', handleWheel);
            canvas.removeEventListener('gesturestart', handleGestureStart);
            canvas.removeEventListener('gesturechange', handleGestureChange);
            canvas.removeEventListener('gestureend', handleGestureEnd);
        };
    }, [gestureMode, handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, handleGestureStart, handleGestureChange, handleGestureEnd]);

    return (
        <div className="w-full h-screen bg-black relative font-sans overflow-hidden">

            {/* 3D Viewport */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
                    <CosmicScene 
                        shape={shape} 
                        color={color} 
                        expansion={expansion} 
                        text={text}
                        cameraPosition={cameraPosition}
                        cameraRotation={cameraRotation}
                        gestureMode={gestureMode}
                    />
                </Canvas>
            </div>

                {/* UI Layer */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">


                  {/* Top Bar */}
                  <header className="flex justify-between items-start pointer-events-none">
                      <div>
                          <h1 className="text-3xl font-bold text-white drop-shadow-lg tracking-tighter">
                              AURA <span className="text-indigo-400">PARTICLES</span>
                          </h1>
                          <p className="text-gray-400 text-xs mt-1">Interactive Generative System</p>
                      </div>
                  </header>

                {/* Main Controls Overlay */}
                <div className="flex-1 flex items-center justify-between pointer-events-none mt-8">

                    {/* Left Sidebar: Templates */}
                    <div className="flex flex-col gap-4 pointer-events-auto">
                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex flex-col gap-2">
                            {shapes.map((s) => (
                                <button
                                    key={s.type}
                                    onClick={() => setShape(s.type)}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative group ${shape === s.type
                                        ? 'bg-indigo-600 text-white shadow-lg scale-110'
                                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <s.icon size={20} />

                                    {/* Tooltip */}
                                    <span className="absolute left-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {s.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                      {/* Right Sidebar Group */}
                      <div className="flex flex-col gap-4 pointer-events-auto">

                          {/* Gesture Toggle */}
                          <button
                              onClick={() => setGestureMode(!gestureMode)}
                              className={`p-3 rounded-2xl font-medium text-sm transition-all border flex items-center justify-center gap-2 backdrop-blur-xl shadow-2xl ${gestureMode
                                  ? 'bg-red-500/20 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                                  : 'bg-black/40 border-white/10 text-white hover:bg-white/20'
                                  }`}
                          >
                              {gestureMode ? <VideoOff size={18} /> : <Video size={18} />}
                              <span className="text-xs">{gestureMode ? 'OFF' : 'ON'}</span>
                          </button>

                          {/* Search Bar (Morph to Text) */}
                          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex items-center gap-2 shadow-2xl">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && morphToText(inputText)}
                                placeholder="Type & Enter..."
                                className="bg-transparent border-none text-white text-xs w-24 focus:outline-none placeholder-gray-500 text-right"
                            />
                            <button
                                onClick={() => morphToText(inputText)}
                                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-colors"
                            >
                                <Zap size={14} />
                            </button>
                        </div>

                        {/* Tone & Expansion Dock */}
                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex flex-col gap-6 shadow-2xl">

                            {/* Color Picker */}
                            <div className="flex flex-col gap-2 items-center">
                                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tone</label>
                                <div className="relative overflow-hidden w-10 h-10 rounded-full border-2 border-white/20 hover:border-white transition-colors">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0"
                                    />
                                </div>
                            </div>

                            <div className="w-full h-px bg-white/10"></div>

                            {/* Manual Expansion Slider (Vertical) */}
                            <div className="flex flex-col gap-2 items-center h-48">
                                <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider w-full text-center">
                                    <span className={gestureMode ? 'text-indigo-400 animate-pulse' : ''}>
                                        {gestureMode ? 'AI' : 'Exp'}
                                    </span>
                                </div>
                                <div className="h-full py-2 flex items-center">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={expansion}
                                        onChange={(e) => {
                                            if (!gestureMode) setExpansion(parseFloat(e.target.value));
                                        }}
                                        disabled={gestureMode}
                                        className={`h-full w-1.5 rounded-lg appearance-none cursor-pointer transition-all -rotate-180 writing-mode-vertical ${gestureMode
                                                ? 'bg-indigo-900/50 accent-indigo-500 cursor-not-allowed'
                                                : 'bg-gray-700 hover:bg-gray-600 accent-white'
                                            }`}
                                        style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gesture Controller */}
            <GestureController
                isActive={gestureMode}
                onGesture={handleGestureUpdate}
            />

        </div>
    );
};

export default Interactive;
