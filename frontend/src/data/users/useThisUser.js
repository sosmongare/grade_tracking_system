import { useQuery, useQueryClient } from "react-query";
import { loadUsers } from '../../../src/data/api/api'

import useCurrentUser from "./useCurrentUser";


function useThisUser(id) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadUsers);
  const onSuccess = ({ user, user_bio}) =>
    queryClient.setQueryData("results", (oldUsers) =>
      oldUsers.map((oldUser) =>
        oldUser.id !== id ? oldUser : {id, user, user_bio}
      )
    );

  const seeUser = useCurrentUser((state) => state.seeUser);
  return {
    result: data?.results.find((u) => u.id === id),
    seeUser: () => seeUser(id),
  };
}

export default useThisUser;

