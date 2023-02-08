import { applySnapshot } from "mobx-state-tree";
import type { StoreType } from "../design";

export const loadStateFromJSONAction = (self: StoreType) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = () => {
        const file = input.files?.item(0);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    const state = JSON.parse(reader.result as string);
                    applySnapshot(self.elements, state);
                    self.selectedElementId.set(undefined);
                }
            };

            reader.onerror = () => {
                alert(reader.error);
            };

            reader.readAsText(file);
        }
    };
    input.click();
};

export const saveStateAsJSONAction = (self: StoreType) => {
    const state = JSON.stringify(self.elements);

    const a = document.createElement("a");
    const file = new Blob([state], { type: "application/json" });
    a.href = URL.createObjectURL(file);
    a.download = "state.json";
    a.click();
};