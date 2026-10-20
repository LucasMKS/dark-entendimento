import React, { useRef, useState } from 'react';

interface DragScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Horizontal carousel container that supports holding the mouse button
 * (or finger on touch screens) to drag-scroll smoothly, while suppressing
 * accidental button clicks when dragging.
 */
export const DragScrollContainer: React.FC<DragScrollContainerProps> = ({
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const draggedDistanceRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    draggedDistanceRef.current = 0;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.35;
    draggedDistanceRef.current = Math.abs(x - startXRef.current);
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggedDistanceRef.current > 6) {
      e.stopPropagation();
      e.preventDefault();
      draggedDistanceRef.current = 0;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onClickCapture={handleClickCapture}
      className={`overflow-x-auto touch-pan-x select-none scroll-smooth ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {children}
    </div>
  );
};
