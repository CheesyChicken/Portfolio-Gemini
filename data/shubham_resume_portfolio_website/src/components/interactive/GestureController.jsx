import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import { Camera, Hand } from 'lucide-react';

const GestureController = ({ onGesture, isActive }) => {
    const videoRef = useRef(null);
    const [model, setModel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("Initializing...");
    const requestRef = useRef();

    // Initialize Model
    useEffect(() => {
        const loadModel = async () => {
            try {
                await tf.setBackend('webgl');
                const loadedModel = await handpose.load();
                setModel(loadedModel);
                setLoading(false);
                setStatus("Model Ready");
                console.log("Handpose model loaded");
            } catch (err) {
                console.error("Failed to load handpose model", err);
                setLoading(false);
                setStatus("Model Error");
            }
        };
        loadModel();
    }, []);

    // Start Camera
    useEffect(() => {
        if (isActive && videoRef.current && !videoRef.current.srcObject) {
            const startCamera = async () => {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            video: { facingMode: "user", width: 320, height: 240 }
                        });
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                            videoRef.current.onloadedmetadata = () => {
                                videoRef.current.play();
                                detectHands();
                            };
                            setStatus("Camera Active");
                        }
                    } catch (err) {
                        console.error("Failed to access camera", err);
                        setStatus("Camera Denied");
                    }
                }
            };
            startCamera();
        } else if (!isActive && videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setStatus("Stopped");
        }
    }, [isActive]);

    // Detection Loop
    const detectHands = async () => {
        // Always schedule next frame if active
        if (isActive) {
            requestRef.current = requestAnimationFrame(detectHands);
        }

        if (videoRef.current && model && videoRef.current.readyState === 4) {
            try {
                const predictions = await model.estimateHands(videoRef.current);

                if (predictions.length > 0) {
                    const hand = predictions[0];
                    const landmarks = hand.landmarks;

                    // Thumb tip: 4, Index tip: 8
                    const thumbTip = landmarks[4];
                    const indexTip = landmarks[8];

                    const distance = Math.sqrt(
                        Math.pow(thumbTip[0] - indexTip[0], 2) +
                        Math.pow(thumbTip[1] - indexTip[1], 2)
                    );

                    // Map distance to expansion (0 to 1)
                    const expansion = Math.min(Math.max((distance - 20) / 130, 0), 1);

                    onGesture({
                        expansion: expansion,
                        hasHand: true,
                        detected: true
                    });
                    setStatus("Hand Detected");
                } else {
                    onGesture({ hasHand: false, detected: false });
                    setStatus("Scanning...");
                }
            } catch (err) {
                console.error("Detection error", err);
                setStatus("Detection Error");
            }
        } else {
            if (!model) setStatus("Loading Model...");
            else if (!videoRef.current || videoRef.current.readyState !== 4) setStatus("Waiting for Camera...");
        }
    };

    // Start Loop when active
    useEffect(() => {
        if (isActive) {
            requestRef.current = requestAnimationFrame(detectHands);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isActive, model]); // Restart loop if active changes or model loads

    useEffect(() => {
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    if (!isActive) return null;

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col items-end pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md border border-white/20 p-2 rounded-lg flex flex-col items-center pointer-events-auto shadow-2xl">
                <div className="relative rounded overflow-hidden border border-gray-700 w-32 h-24">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover -scale-x-100"
                        playsInline
                        muted
                    />
                </div>
                <div className="mt-2 text-[10px] font-mono uppercase text-green-400">
                    {status}
                </div>
                <div className="text-[9px] text-gray-500 mt-1 text-center w-full leading-tight">
                    Pinch to Compress<br />
                    Open to Expand
                </div>
            </div>
        </div>
    );
};

export default GestureController;
