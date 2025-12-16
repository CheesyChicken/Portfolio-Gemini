import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import { Camera, Hand } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GestureController = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [model, setModel] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const [status, setStatus] = useState('Initializing...');
    const [gesture, setGesture] = useState(null);
    const navigate = useNavigate();
    const lastGestureTime = useRef(0);

    useEffect(() => {
        const loadModel = async () => {
            try {
                await tf.ready();
                const loadedModel = await handpose.load();
                setModel(loadedModel);
                setStatus('Ready to start');
            } catch (err) {
                console.error("Failed to load handpose model", err);
                setStatus('Error loading AI');
            }
        };
        loadModel();
    }, []);

    const startVideo = async () => {
        setIsEnabled(true);
        setStatus('Starting camera...');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                detectHand();
            }
        }
    };

    const stopVideo = () => {
        setIsEnabled(false);
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
    };

    const detectHand = async () => {
        if (!videoRef.current || !model || !isEnabled) return;

        // Detect hand
        const predictions = await model.estimateHands(videoRef.current);

        if (predictions.length > 0) {
            const landmarks = predictions[0].landmarks;
            const fingers = countFingers(landmarks);

            const now = Date.now();
            if (now - lastGestureTime.current > 1000) { // Debounce gestures
                handleGesture(fingers);
                lastGestureTime.current = now;
            }
        }

        if (isEnabled) {
            requestAnimationFrame(detectHand);
        }
    };

    const countFingers = (landmarks) => {
        // Simple logic: Check if finger tip is higher than finger base (y-coordinate is smaller)
        // Thumb: 4, Index: 8, Middle: 12, Ring: 16, Pinky: 20
        // Bases: Thumb: 2, Index: 5, Middle: 9, Ring: 13, Pinky: 17

        let count = 0;
        const tips = [8, 12, 16, 20];
        const bases = [5, 9, 13, 17];

        // Check 4 fingers
        for (let i = 0; i < tips.length; i++) {
            if (landmarks[tips[i]][1] < landmarks[bases[i]][1]) {
                count++;
            }
        }

        // Thumb is tricky, check x-distance
        if (landmarks[4][0] > landmarks[3][0]) {
            count++;
        }

        return count;
    };

    const handleGesture = (fingerCount) => {
        setGesture(`${fingerCount} Fingers`);

        switch (fingerCount) {
            case 1:
                window.scrollBy({ top: 300, behavior: 'smooth' });
                setStatus('Scrolling Down');
                break;
            case 2:
                window.scrollBy({ top: -300, behavior: 'smooth' });
                setStatus('Scrolling Up');
                break;
            case 5:
                // Open palm - Navigate to next page logic (simplified cycle)
                const paths = ['/', '/about', '/projects', '/experience', '/contact', '/interactive'];
                const currentPath = window.location.pathname;
                const currentIndex = paths.indexOf(currentPath);
                const nextIndex = (currentIndex + 1) % paths.length;
                navigate(paths[nextIndex]);
                setStatus('Navigating...');
                break;
            default:
                setStatus('Waiting...');
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
            {isEnabled && (
                <div className="bg-black/80 p-2 rounded-xl border border-gray-700 w-48">
                    <video
                        ref={videoRef}
                        className="w-full h-32 object-cover rounded-lg mb-2 transform scale-x-[-1]"
                        muted
                    />
                    <div className="text-white text-xs font-mono">
                        <p>Status: {status}</p>
                        <p>Gesture: {gesture || 'None'}</p>
                        <div className="mt-2 text-[10px] text-gray-400">
                            1 Finger: Scroll Down<br />
                            2 Fingers: Scroll Up<br />
                            5 Fingers: Next Page
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={isEnabled ? stopVideo : startVideo}
                className={`p-3 rounded-full shadow-lg transition-all ${isEnabled ? 'bg-red-500 text-white' : 'bg-primary text-white'
                    }`}
            >
                {isEnabled ? <Camera size={24} /> : <Hand size={24} />}
            </button>
        </div>
    );
};

export default GestureController;
