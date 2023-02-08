import { ChangeEvent, FC } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/design";
import Konva from "konva";

type ToolbarProps = {
    getStageData: () => Konva.Stage | null;
};

const ToolbarImpl: FC<ToolbarProps> = ({ getStageData }) => {
    const store = useStore();
    const { loadStateFromJSON, saveStateAsJSON, selectedElement, preview, selectedElementId } = store;

    const onPointsChange = (e: ChangeEvent<HTMLInputElement>) => {
        selectedElement?.set({
            ...selectedElement,
            points: Number(e.target.value),
        });
    };

    const onFillChange = (e: ChangeEvent<HTMLInputElement>) => {
        selectedElement?.set({
            ...selectedElement,
            fill: e.target.value,
        });
    };

    const onGeneratePreview = () => {
        const stage = getStageData();
        if (stage) {
            selectedElementId.set(undefined);
            const dataURL = stage.toDataURL();
            preview.set(dataURL);
        }
    };

    return (
        <div className="toolbar">
            {selectedElement && 
                <>
                    <p>Selected element id: {selectedElement?.id}</p>
                    <label>
                        Number of points: {selectedElement && selectedElement.points}
                        <input type="range" onChange={onPointsChange} min="3" max="10" value={selectedElement?.points} />
                    </label>
                    <label>
                        Fill color:
                        <input type="color" onChange={onFillChange} value={selectedElement?.fill} />
                    </label>
                </>
            }
            <button onClick={saveStateAsJSON}>Download JSON</button>
            <button onClick={loadStateFromJSON}>Upload JSON</button>
            <button onClick={onGeneratePreview}>Generate Preview</button>
        </div>
    );
};

export const Toolbar = observer(ToolbarImpl);
