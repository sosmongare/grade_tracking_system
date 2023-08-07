import { useQuery, useQueryClient } from "react-query";
import { loadCourses } from '../../../src/data/api/api'
import useCurrentCourse from "./useCurrentCourse";


function useThisCourse(uuid) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadCourses);
  const onSuccess = ({ owner}) =>
    queryClient.setQueryData("results", (oldCourses) =>
      oldCourses.map((oldCourse) =>
        oldCourse.uuid !== uuid ? oldCourse : { uuid, owner}
      )
    );

  const seeCourse = useCurrentCourse((state) => state.seeCourse);
  return {
    course: data?.results.find((p) => p.uuid === uuid),
    seeCourse: () => seeCourse(uuid),
  };
}

export default useThisCourse;

