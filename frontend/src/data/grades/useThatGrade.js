import { useQuery, useQueryClient } from "react-query";
import { loadGrade } from '../../../src/data/api/api'
import useCurrentGrade from "./useCurrentGrade";

function useThatGrade() {
  const id = useCurrentGrade((state) => state.currentId);
  const seeAllGrades = useCurrentGrade((state) => state.seeAllGrades);

  // Find what we already know about this thing
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("grades");
  const partialGrade = data.grades.find((g) => g.id === id);
  const placeholderData = {
    ...partialGrade,
   

  };
  const { data: grade } = useQuery(
    ["currentGrade", { id }],
    () => loadGrade(id),
    { placeholderData }
  );

  return {
   grade,
    seeAllGrades,
  };
}

export default useThatGrade;
