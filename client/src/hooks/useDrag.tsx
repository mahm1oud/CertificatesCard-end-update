// @/hooks/useDrag.ts
import { useDrag } from "react-use-gesture";

export const useDraggable = (onMove: (position: { x: number; y: number }) => void) => {
  return useDrag(({ xy: [x, y] }) => {
    onMove({ x, y });
  });
};