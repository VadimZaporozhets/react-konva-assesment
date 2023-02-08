import { Instance, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { randomInRange } from "../util/randomInRange";
import { loadStateFromJSONAction, saveStateAsJSONAction } from "./actions/design";
import { Element } from "./element";
import { Preview } from "./preview";
import { SelectedElementId } from "./selectedElementId";

function generateInitialState() {
  const initialState = [];

  for (let i = 0; i < 10; i++) {
    initialState.push({
      id: `id-${i}`,
      x: randomInRange(window.innerWidth),
      y: randomInRange(window.innerHeight),
      numPoints: 5,
    });
  }

  return initialState;
}

export const Store = types.model("Store", {
  elements: types.array(Element),
  selectedElementId: SelectedElementId,
  preview: Preview,
}).actions((self) => ({
  saveStateAsJSON() {
    saveStateAsJSONAction(self as StoreType);
  },
  loadStateFromJSON() {
    loadStateFromJSONAction(self as StoreType);
  },
})).views((self) => ({
  get selectedElement() {
    return self.elements.find((element) => element.id === self.selectedElementId.id);
  }
}));


export type StoreType = Instance<typeof Store>;

const store = Store.create({
  elements: generateInitialState(),
  selectedElementId: {},
  preview: {},
});

export default store;

export const StoreContext = createContext<StoreType>(store);

export const useStore = () => useContext(StoreContext);
