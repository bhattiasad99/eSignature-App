import React, { useState } from 'react';
import Draggable from 'react-draggable';

const DraggableInputField = ({ index, x, y, text, onDrag, onTextChange }) => {
    const [position, setPosition] = useState({ x, y });

    const handleDrag = (e, ui) => {
        const newPosition = {
            x: position.x + ui.deltaX,
            y: position.y + ui.deltaY,
        };

        setPosition(newPosition);
        onDrag(index, newPosition);
    };

    const handleTextChange = (e) => {
        const newText = e.target.value;
        onTextChange(index, newText);
    };

    return (
        <Draggable
            position={position}
            onDrag={handleDrag}
        >
            <div
                style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    border: '1px dashed blue',
                    padding: '5px',
                }}
            >
                <input
                    type="text"
                    value={text}
                    onChange={handleTextChange}
                />
            </div>
        </Draggable>
    );
};

export default DraggableInputField;
