import useCurrentCourse from "./useCurrentCourse";

function useHasCurrentCourse() {
  return useCurrentCourse((state) => !!state.currentId);
}

export default useHasCurrentCourse;
