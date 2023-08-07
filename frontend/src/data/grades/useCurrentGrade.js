import {create} from "zustand";

const useCurrentGrade = create((set) => ({
  currentId: null,
  seeGrade: (id) => set(() => ({ currentId: id })),
  seeAllGrades: () => set(() => ({ currentId: null })),
}));

export default useCurrentGrade;
