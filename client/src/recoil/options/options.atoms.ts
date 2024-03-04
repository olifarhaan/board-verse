import { atom } from "recoil";
import { CtxOptions } from "../../types";

export const optionsAtom = atom<CtxOptions>({
  key: "options",
  default: {
    lineColor: "#000000",
    lineWidth: 5,
    erase: false,
  },
});
