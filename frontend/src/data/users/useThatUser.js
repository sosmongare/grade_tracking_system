import { useQuery, useQueryClient } from "react-query";
import { loadUser } from '../../../src/data/api/api'
import useCurrentUser from "./useCurrentUser";

function useThatUser() {
  const id = useCurrentUser((state) => state.currentId);
  const seeAllUsers = useCurrentUser((state) => state.seeAllUsers);

  // Find what we already know about this thing
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("users");
  const partialUser = data.users.find((u) => u.id === id);
  const placeholderData = {
    ...partialUser,
    overview: "...",

  };
  const { data: user } = useQuery(
    ["currentUser", { id }],
    () => loadUser(id),
    { placeholderData }
  );

  return {
    user,
    seeAllUsers,
  };
}

export default useThatUser;
