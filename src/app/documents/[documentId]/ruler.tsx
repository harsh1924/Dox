/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {

    const [leftMargin, setLeftMargin] = useState(56);;
    const [rightMargin, setRightMargin] = useState(56);;
    const [isDraggingLeft, setIsDraggingLeft] = useState(false);
    const [isDraggingRight, setIsDraggingRight] = useState(false);
    const rulerRef = useRef<HTMLDivElement>(null);

    const handleLeftMouseDown = () => {
        setIsDraggingLeft(true);
    }

    const handleRightMouseDown = () => {
        setIsDraggingRight(true);
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
            const container = rulerRef.current.querySelector('#ruler-container');
            if (container) {
                const containerRect = container.getBoundingClientRect();
                const relativeX = e.clientX - containerRect.left;
                const rawPosition = Math.max(0, Math.min(816, relativeX));

                if (isDraggingLeft) {
                    const maxLeftPosition = 816 - rightMargin - 100;
                    const newLeftPostion = Math.min(rawPosition, maxLeftPosition);
                    setLeftMargin(newLeftPostion); // TODO: Make Collaborative
                } else if (isDraggingRight) {
                    const maxRightPosition = 816 - (leftMargin + 100);
                    const newRightPosition = Math.max(816 - rawPosition, 0);
                    const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition);
                    setRightMargin(constrainedRightPosition);
                }
            }
        }
    }

    const handleMouseUp = () => {
        setIsDraggingLeft(false);
        setIsDraggingRight(false);
    }

    const handleLeftDoubleClick = () => {
        setLeftMargin(56);
    }

    const handleRightDoubleClick = () => {
        setRightMargin(56);
    }

    return (
        <div
            ref={rulerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative flex items-end border-gray-300 print:hidden border-b h-6 select-none w-[816px] mx-auto">
            <div
                className="relative w-full h-full"
                id="ruler-container">
                <Marker
                    position={leftMargin}
                    isLeft={true}
                    isDragging={isDraggingLeft}
                    onMouseDown={handleLeftMouseDown}
                    onDoubleClick={handleLeftDoubleClick}
                />
                <Marker
                    position={rightMargin}
                    isLeft={false}
                    isDragging={isDraggingRight}
                    onMouseDown={handleRightMouseDown}
                    onDoubleClick={handleRightDoubleClick}
                />
                <div className="bottom-0 absolute inset-x-0 h-full">
                    <div className="relative w-816px] h-full">
                        {markers.map((marker) => {
                            const position = (marker * 816) / 82;
                            return (
                                <div
                                    className="bottom-0 absolute"
                                    key={marker}
                                    style={{ left: `${position}px` }}
                                >
                                    {marker % 10 === 0 && (
                                        <>
                                            <div className="bottom-0 absolute bg-neutral-500 w-[1px] h-2" />
                                            <span className="bottom-2 absolute text-[10px] text-neutral-500 transform -translate-x-1/2">
                                                {marker / 10 + 1}
                                            </span>
                                        </>
                                    )}
                                    {marker % 5 === 0 && marker % 10 !== 0 && (
                                        <div className="bottom-0 absolute bg-neutral-500 w-[1px] h-1.5" />
                                    )}
                                    {marker % 5 !== 0 && (
                                        <div className="bottom-0 absolute bg-neutral-500 w-[1px] h-1" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface MarkerProps {
    position: number;
    isLeft: boolean;
    isDragging: boolean;
    onMouseDown: () => void;
    onDoubleClick: () => void;
}

const Marker = ({
    position,
    isLeft,
    isDragging,
    onDoubleClick,
    onMouseDown
}: MarkerProps) => {
    return (
        <div
            className="top-0 z-[5] absolute -ml-2 w-4 h-full cursor-ew-resize"
            style={{ [isLeft ? "left" : 'right']: `${position}px` }}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
        >
            <FaCaretDown className='top-0 left-1/2 absolute h-full transform -translate-x-1/2 fill-blue-500' />
            <div
                className="top-4 left-1/2 absolute transform-trasnlate-x-1/2"
                style={{
                    height: '100vh',
                    width: '1px',
                    transform: 'scaleX(0.5)',
                    backgroundColor: '#3b72f6',
                    display: isDragging ? 'block' : 'none'
                }} />
        </div>
    )
}