import useCurrentGrade from "./useCurrentGrade";

function useHasCurrentGrade() {
  return useCurrentGrade((state) => !!state.currentId);
}

export default useHasCurrentGrade;
