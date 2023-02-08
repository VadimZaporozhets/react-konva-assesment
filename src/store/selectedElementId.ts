import { Instance, types } from "mobx-state-tree";

export const SelectedElementId = types.model("Selected Element ID", {
  id: types.maybe(types.string),
}).actions((self) => ({
  set(id: string | undefined) {
    self.id = id;
  },
}));

export type SelectedElementIdType = Instance<typeof SelectedElementId>;
