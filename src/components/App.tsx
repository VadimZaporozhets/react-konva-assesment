import { useRef } from "react";
import type Konva from "konva";
import { Artboard } from "./Artboard";
import { Toolbar } from "./Toolbar";
import { Preview } from "./Preview";

export function App() {
  const stageRef = useRef<Konva.Stage>(null);

  const getStageRefData = () => {
    return stageRef.current;
  };

  return (
    <div>
      <Artboard ref={stageRef} />
      <Toolbar getStageData={getStageRefData} />
      <Preview />
    </div>
  );
};
