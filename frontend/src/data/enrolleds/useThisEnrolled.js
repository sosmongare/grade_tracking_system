import { useQuery, useQueryClient } from "react-query";
import { loadEnrolleds } from '../../../src/data/api/api'

import useCurrentEnrolled from "./useCurrentEnrolled";


function useThisEnrolled(id) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadEnrolleds);
  const onSuccess = ({user}) =>
    queryClient.setQueryData("results", (oldEnrolleds) =>
      oldEnrolleds.map((oldEnrolled) =>
        oldEnrolled.id !== id ? oldEnrolled : { id, user }
      )
    );

  const seeEnrolled = useCurrentEnrolled((state) => state.seeEnrolled);
  return {
    result: data?.results?.find((e) => e.id === id),
    seeEnrolled: () => seeEnrolled(id),
  };
}

export default useThisEnrolled;

