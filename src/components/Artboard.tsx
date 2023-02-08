import { forwardRef, ForwardRefRenderFunction } from "react";
import type Konva from "konva";
import { observer } from "mobx-react-lite";
import { Layer, Stage } from "react-konva";
import { StarElement } from "../elements/StarElement";
import { useStore } from "../store/design";

const ArtboardImpl: ForwardRefRenderFunction<Konva.Stage, {}> = (_, stageRef) => {
  const { elements, selectedElementId } = useStore();

  const deselect = () => {
    selectedElementId?.set(undefined);
  };

  return (
    <Stage ref={stageRef} onClick={deselect} onTap={deselect} width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {elements.map((element) => (
          <StarElement element={element} key={element.id} />
        ))}
      </Layer>
    </Stage>
  );
};

export const Artboard = observer(forwardRef<Konva.Stage>(ArtboardImpl));

