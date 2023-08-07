import useCurrentUser from "./useCurrentUser";

function useHasCurrentUser() {
  return useCurrentUser((state) => !!state.currentId);
}

export default useHasCurrentUser;
