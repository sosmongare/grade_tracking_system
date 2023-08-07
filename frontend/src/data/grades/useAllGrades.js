import { useQuery } from "react-query";
import { loadGrades } from '../../../src/data/api/api'

function useAllGrades() {
  const { data = { results: [] }} = useQuery("results", loadGrades);
  
  console.log(data)
 
  return (data.results ?? []).map(({ id }) => id);
}

export default useAllGrades;
