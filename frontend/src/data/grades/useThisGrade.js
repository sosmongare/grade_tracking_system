import { useQuery, useQueryClient } from "react-query";
import { loadGrades } from '../../../src/data/api/api'
import useCurrentGrade from "./useCurrentGrade";


function useThisGrade(id) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadGrades);
  const onSuccess = ({ course, user, grade_score}) =>
    queryClient.setQueryData("results", (oldGrades) =>
      oldGrades.map((oldGrade) =>
        oldGrade.id !== id ? oldGrade : { id, course, user, grade_score}
      )
    );

  const seeGrade = useCurrentGrade((state) => state.seeGrade);
  return {
    result: data?.results.find((g) => g.id === id),
    seeGrade: () => seeGrade(id),
  };
}

export default useThisGrade;

