import { useState } from "react";
import { Resizable } from "react-resizable";

export const useResizable = (initialSize: { width: number; height: number }) => {
  const [size, setSize] = useState(initialSize);

  const onResize = (_e: any, data: any) => {
    setSize(data.size);
  };

  return {
    props: {
      width: size.width,
      height: size.height,
      onResize,
    },
    size,
  };
};