import { useRef, useEffect } from "react";
import type Konva from "konva";
import { Star, Transformer } from "react-konva";
import { ElementType } from "../store/element";
import { useStore } from "../store/design";
import { observer } from "mobx-react-lite";
import type { Box } from "konva/lib/shapes/Transformer";

interface StarProps {
  element: ElementType;
}

const minShapeSize = 5;

export function StarElementImpl(props: StarProps) {
  const { element } = props;
  const elementId = element.id;
  const { selectedElementId: selectedElement } = useStore();

  const shapeRef = useRef<Konva.Star>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const isSelected = elementId === selectedElement?.id;

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      if (transformerRef.current) {
        transformerRef.current.nodes([shapeRef.current!]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    }
  }, [isSelected]);

  const selectShape = (e: Konva.KonvaEventObject<MouseEvent>) => {
    selectedElement?.set(elementId);

    e.cancelBubble = true;
  };

  const onBoundBoxFunc = (oldBox: Box, newBox: Box) => {
    // limit resize
    if (newBox.width < minShapeSize || newBox.height < minShapeSize) {
      return oldBox;
    }

    return newBox;
  };

  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    element.set({
      ...element,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const onTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    element.set({
      ...element,
      x: e.target.x(),
      y: e.target.y(),
      scaleX: e.target.scaleX(),
      scaleY: e.target.scaleY(),
      rotation: e.target.rotation(),
    });
  };

  return (
    <>
      <Star
        ref={shapeRef}
        id={elementId}
        x={element.x}
        y={element.y}
        scaleX={element.scaleX}
        scaleY={element.scaleY}
        rotation={element.rotation}
        numPoints={element.points}
        innerRadius={20}
        outerRadius={40}
        draggable
        onTransformEnd={onTransformEnd}
        onDragEnd={onDragEnd}
        onClick={selectShape}
        onTap={selectShape}
        fill={element.fill}
      />
      {isSelected && <Transformer
        ref={transformerRef}
        boundBoxFunc={onBoundBoxFunc}
        anchorCornerRadius={5}
        anchorSize={10}
        borderStroke={element.fill}
        anchorStroke={element.fill}
      />}
    </>
  );
}

export const StarElement = observer(StarElementImpl);
