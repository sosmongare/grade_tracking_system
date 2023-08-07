import { useQuery } from "react-query";
import { loadCourses } from '../../../src/data/api/api'

function useAllCourses() {
  const { data = { results: [] }} = useQuery("results", loadCourses);
  
  //console.log(data)
 
  return (data.results ?? []).map(({ uuid }) => uuid);
}

export default useAllCourses;
