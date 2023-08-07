import axios from 'axios';

/*create an instance of axios with a default base URI when sending HTTP requests*/
/*JSON Server has CORS Policy by default*/
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export default api;

export const EndPoints = {
  results: 'http://127.0.0.1:8000/api/courses/',
  login: 'http://127.0.0.1:8000/apis/auth/login/',
  register: 'http://127.0.0.1:8000/apis/auth/register/',
  users: 'http://127.0.0.1:8000/apis/users/',
  usersDb: 'users-db',

};
