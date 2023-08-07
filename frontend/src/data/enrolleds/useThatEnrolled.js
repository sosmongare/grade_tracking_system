import { useQuery, useQueryClient } from "react-query";
import { loadEnrolled } from '../../../src/data/api/api'
import useCurrentEnrolled from "./useCurrentEnrolled";

function useThatEnrolled() {
  const id = useCurrentEnrolled((state) => state.currentId);
  const seeAllEnrolleds = useCurrentEnrolled((state) => state.seeAllEnrolleds);

  // Load enrollment partially
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("enrolleds");
  const partialEnrolled = data.enrolleds.find((e) => e.id === id);
  const placeholderData = {
    ...partialEnrolled,
   

  };
  const { data: enrolled } = useQuery(
    ["currentEnrolled", { id }],
    () => loadEnrolled(id),
    { placeholderData }
  );

  return {
   enrolled,
    seeAllEnrolleds,
  };
}

export default useThatEnrolled;
