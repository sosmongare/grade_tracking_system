import {create} from "zustand";

const useCurrentCourse = create((set) => ({
  currentId: null,
  seeCourse: (uuid) => set(() => ({ currentId: uuid })),
  seeAllCourses: () => set(() => ({ currentId: null })),
}));

export default useCurrentCourse;
