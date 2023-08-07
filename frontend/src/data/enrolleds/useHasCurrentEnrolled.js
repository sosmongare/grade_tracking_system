import useCurrentEnrolled from "./useCurrentEnrolled";

function useHasCurrentEnrolled() {
  return useCurrentEnrolled((state) => !!state.currentId);
}

export default useHasCurrentEnrolled;
