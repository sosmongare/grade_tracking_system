import {create} from "zustand";

const useCurrentEnrolled = create((set) => ({
  currentId: null,
  seeEnrolled: (id) => set(() => ({ currentId: id })),
  seeAllEnrolleds: () => set(() => ({ currentId: null })),
}));

export default useCurrentEnrolled;
