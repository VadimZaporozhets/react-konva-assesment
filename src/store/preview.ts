import { Instance, types } from "mobx-state-tree";

export const Preview = types.model("Preview", {
  imageData: types.maybe(types.string),
}).actions((self) => ({
  set(data: string) {
    self.imageData = data;
  },
}));

export type PreviewType = Instance<typeof Preview>;
