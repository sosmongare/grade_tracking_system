import api, { EndPoints } from '../api/axios'


export async function getCoursesAxios() {
  return await api.get(EndPoints.results);
}

export async function postCourseAxios(result) {
  return await api.post(EndPoints.results, result);
}
