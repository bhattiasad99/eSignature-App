// SignatureBox.js
import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const SignatureBox = ({ onResize, onDrag, initialPosition }) => {
    const [signatureBoxData, setSignatureBoxData] = useState({
        left: initialPosition.left,
        top: initialPosition.top,
        width: 150, // Initial width
        height: 75, // Initial height
    });

    const signatureBoxRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                signatureBoxRef.current &&
                !signatureBoxRef.current.contains(e.target) &&
                signatureBoxData.left !== -1000
            ) {
                // Clicked outside of the signature box and it's not hidden
                setSignatureBoxData({
                    ...signatureBoxData,
                    left: -1000, // Move the signature box off-screen to hide it
                });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [signatureBoxData]);

    const handleResize = (e, { size }) => {
        setSignatureBoxData({
            ...signatureBoxData,
            width: size.width,
            height: size.height,
        });

        if (onResize) {
            onResize(size);
        }
    };

    const handleDrag = (e, { deltaX, deltaY }) => {
        setSignatureBoxData({
            ...signatureBoxData,
            left: signatureBoxData.left + deltaX,
            top: signatureBoxData.top + deltaY,
        });

        if (onDrag) {
            onDrag({ left: signatureBoxData.left, top: signatureBoxData.top });
        }
    };

    return (
        <Draggable
            defaultPosition={{ x: signatureBoxData.left, y: signatureBoxData.top }}
            onDrag={handleDrag}
        >
            <Resizable
                width={signatureBoxData.width}
                height={signatureBoxData.height}
                onResize={handleResize}
                minConstraints={[100, 50]}
                maxConstraints={[400, 200]}
            >
                <div
                    ref={signatureBoxRef}
                    style={{
                        position: "absolute",
                        border: "2px solid blue",
                        borderRadius: "5px",
                        width: "10%",
                        height: "5%",
                        pointerEvents: "auto",
                        zIndex: 999,
                    }}
                >
                    {/* You can add content or controls for resizing here */}
                    Signature
                    <input
                        type="text"
                        style={{ display: "block" }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            </Resizable>
        </Draggable>
    );
};

export default SignatureBox;
