import { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/design";

const canvasWidth = 300;

const PreviewImpl = () => {
    const { preview } = useStore();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && preview.imageData) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, canvasWidth, canvasWidth);
                const img = new Image();
                img.onload = () => {
                    const scale = canvasWidth / img.width;
                    ctx.filter = "grayscale(100%)";
                    ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
                };
                img.src = preview.imageData;
            }
        }
    }, [preview.imageData]);

    const closePreview = () => {
        preview.set('');
    };
    
    if (!preview.imageData) return null;

    return (
        <div className="preview">
            <button className="close-btn" onClick={closePreview}>&times;</button>
            <canvas ref={canvasRef} />
        </div>
    );
};

export const Preview = observer(PreviewImpl);
