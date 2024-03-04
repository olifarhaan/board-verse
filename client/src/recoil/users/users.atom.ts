import { atom, selector } from "recoil";
import { Move } from "../../types";

export const usersAtom = atom<{ [key: string]: Move[] }>({
  key: "users",
  default: {},
});

export const userIds = selector({
  key: "userIds",
  get: ({ get }) => {
    const users = get(usersAtom);
    return Object.keys(users);
  },
});
