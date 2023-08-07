import { useQuery, useQueryClient } from "react-query";
import { loadCourse } from '../../../src/data/api/api'
import useCurrentCourse from "./useCurrentCourse";

function useThatCourse() {
  const id = useCurrentCourse((state) => state.currentId);
  const seeAllCourses = useCurrentCourse((state) => state.seeAllCourses);

  // Load courses partially
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("course");
  const partialCourse = data.results.find((c) => c.id === id);
  const placeholderData = {
    ...partialCourse,
    overview: "...",

  };
  const { data: course } = useQuery(
    ["currentCourse", { id }],
    () => loadCourse(id),
    { placeholderData }
  );

  return {
    course,
    seeAllCourses,
  };
}

export default useThatCourse;
