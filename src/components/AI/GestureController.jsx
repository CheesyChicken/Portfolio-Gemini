import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import { Camera, Hand, RefreshCw } from 'lucide-react';

const GestureController = ({ isActive, onGesture }) => {
    const videoRef = useRef(null);
    const [model, setModel] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const [status, setStatus] = useState('Initializing AI...');
    const [debugInfo, setDebugInfo] = useState('');

    // Tracking previous state for deltas
    const lastHandPos = useRef(null);
    const lastPinchDist = useRef(null);

    // Initial Load
    useEffect(() => {
        let ismounted = true;
        const loadModel = async () => {
            try {
                // Ensure backend is ready
                await tf.ready();
                const loadedModel = await handpose.load();
                if (ismounted) {
                    setModel(loadedModel);
                    setStatus('AI Ready');
                }
            } catch (err) {
                console.error("Failed to load handpose", err);
                if (ismounted) setStatus('AI Error');
            }
        };
        loadModel();
        return () => { ismounted = false; };
    }, []);

    // Effect to start/stop video based on props or toggle
    useEffect(() => {
        if (isActive && model && !isEnabled) {
            startVideo();
        } else if (!isActive && isEnabled) {
            stopVideo();
        }
    }, [isActive, model]);

    const startVideo = async () => {
        try {
            setIsEnabled(true);
            setStatus('Starting Camera...');

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user", width: 640, height: 480 }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // Wait for data to be loaded
                videoRef.current.onloadeddata = () => {
                    videoRef.current.play();
                    requestAnimationFrame(detectHand);
                    setStatus('Tracking Hand...');
                };
            }
        } catch (err) {
            console.error("Camera failed", err);
            setStatus('Camera Error');
            setIsEnabled(false);
        }
    };

    const stopVideo = () => {
        setIsEnabled(false);
        setStatus('Stopped');
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(t => t.stop());
            videoRef.current.srcObject = null;
        }
    };

    const detectHand = async () => {
        if (!videoRef.current || !model || !isEnabled) return;

        // Make sure video is ready
        if (videoRef.current.readyState !== 4) {
            requestAnimationFrame(detectHand);
            return;
        }

        try {
            const predictions = await model.estimateHands(videoRef.current);

            if (predictions.length > 0) {
                const hand = predictions[0];
                const landmarks = hand.landmarks;

                // 1. Calculate Hand Center (Palm base [0] + Middle Finger Base [9]) / 2 roughly
                // Or just use Palm Base [0] for stability
                const palmBase = landmarks[0];
                const x = palmBase[0];
                const y = palmBase[1];

                // 2. Calculate Pinch Distance (Thumb Tip [4] vs Index Tip [8])
                const thumbTip = landmarks[4];
                const indexTip = landmarks[8];
                const distance = Math.sqrt(
                    Math.pow(thumbTip[0] - indexTip[0], 2) +
                    Math.pow(thumbTip[1] - indexTip[1], 2)
                );

                // Normalizing coords (Video is 640x480 usually)
                // Invert X because webcam is mirrored
                const normX = -(x - 320) / 320;
                const normY = (y - 240) / 240;

                // --- GESTURE LOGIC ---

                let deltaX = 0;
                let deltaY = 0;
                let zoomDelta = 0;

                // Calulate movement delta
                if (lastHandPos.current) {
                    deltaX = (normX - lastHandPos.current.x) * 5; // Multiplier for sensitivity
                    deltaY = (normY - lastHandPos.current.y) * 5;
                }

                // Calculate pinch/zoom delta
                if (lastPinchDist.current) {
                    // If distance changed significantly
                    const diff = distance - lastPinchDist.current;
                    zoomDelta = diff * -0.05; // Invert: Pinch In = Zoom Out (farther), Pinch Out = Zoom In (closer)
                }

                // Update refs
                lastHandPos.current = { x: normX, y: normY };
                lastPinchDist.current = distance;

                // Send to parent
                if (onGesture) {
                    onGesture({
                        hasHand: true,
                        delta: { x: deltaX, y: deltaY }, // Pan / Rotate
                        zoom: zoomDelta,                 // Camera Z
                        rotation: deltaX * 0.5,          // Rotate scene
                        expansion: Math.min(1, Math.max(0, distance / 150)) // Map pinch width to expansion
                    });
                }

                setDebugInfo(`Hand Detected. PDist: ${Math.round(distance)}`);
            } else {
                // No hand
                lastHandPos.current = null;
                lastPinchDist.current = null;
                setDebugInfo('No Hand');

                if (onGesture) {
                    onGesture({ hasHand: false });
                }
            }
        } catch (err) {
            console.error("Detection error", err);
        }

        if (isEnabled) {
            requestAnimationFrame(detectHand);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 pointer-events-auto">
            {/* Camera Preview (Only if active) */}
            {isEnabled && (
                <div className="bg-black/80 p-2 rounded-xl border border-gray-700 w-48 transition-all animate-fadeIn">
                    <div className="relative">
                        <video
                            ref={videoRef}
                            className="w-full h-32 object-cover rounded-lg transform scale-x-[-1] border border-white/10"
                            muted
                            playsInline
                        />
                        <div className="absolute top-1 left-1">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        </div>
                    </div>

                    <div className="text-white text-[10px] font-mono mt-2 space-y-1">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span className={status === 'Tracking Hand...' ? 'text-green-400' : 'text-yellow-400'}>
                                {status}
                            </span>
                        </div>
                        <div className="text-gray-500">{debugInfo}</div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            {!isActive && (
                <div className="text-white text-xs bg-black/50 px-2 py-1 rounded backdrop-blur-md mb-1">
                    Enable Camera
                </div>
            )}
        </div>
    );
};

export default GestureController;
