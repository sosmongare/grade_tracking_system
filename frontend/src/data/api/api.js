const URLS = {

  COURSES: "http://127.0.0.1:8000/api/courses/",
  COURSE: (uuid) => `http://127.0.0.1:8000/api/courses/${uuid}`,

  GRADES: "http://127.0.0.1:8000/api/grades/",
  GRADE: (id) => `http://127.0.0.1:8000/api/grades/${id}`,

  ENROLLEDS: "http://127.0.0.1:8000/api/enrolled/",//all enrollments
  ENROLLED: (id) => `http://127.0.0.1:8000/api/enrolled/${id}`,//single enrollment. 

  USERS: "http://127.0.0.1:8000/apis/users/",
  USER: (id) => `http://127.0.0.1:8000/apis/users/${id}`,

};

const wrappedFetch = (...args) => {
  return fetch(...args).then((res) => {
    if (!res.ok) {
      throw new Error("Unauthorized");
    }
    return res.json();
  });
};

const get = (url) => wrappedFetch(url);
const post = (url, data) =>
  wrappedFetch(url, { method: "POST", body: data && JSON.stringify(data) });
const remove = (url) => wrappedFetch(url, { method: "DELETE" });

// COURSE API
const loadCourses = () => get(URLS.COURSES);
const loadCourse = (uuid) => get(URLS.COURSE(uuid));

const loadGrades = () => get(URLS.GRADES);
const loadGrade = (id) => get(URLS.GRADE(id));


const loadEnrolleds = () => get(URLS.ENROLLEDS);
const loadEnrolled = (id) => get(URLS.ENROLLED(id));

const loadUsers = () => get(URLS.USERS);
const loadUser = (id) => get(URLS.USER(id));

export {

  loadCourses,
  loadCourse,

  loadGrades,
  loadGrade,

  loadEnrolleds,
  loadEnrolled,

  loadUsers,
  loadUser,

};
