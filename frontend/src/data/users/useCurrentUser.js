import {create} from "zustand";

const useCurrentUser = create((set) => ({
  currentId: null,
  seeUser: (id) => set(() => ({ currentId: id })),
  seeAllUsers: () => set(() => ({ currentId: null })),
}));

export default useCurrentUser;
