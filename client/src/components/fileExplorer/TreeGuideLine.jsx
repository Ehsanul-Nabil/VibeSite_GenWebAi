import React from "react";

export const TreeGuideLine = ({ depth }) => {
  return (
    <div
      className="absolute left-0 top-0 bottom-0 border-l border-slate-800/80 pointer-events-none"
      style={{ left: `${depth * 14 + 16}px` }}
    />
  );
};