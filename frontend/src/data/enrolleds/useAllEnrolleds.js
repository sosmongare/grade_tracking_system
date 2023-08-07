import { useQuery } from "react-query";
import { loadEnrolleds } from '../../../src/data/api/api'

function useAllEnrolleds() {
  const { data = { results: [] }} = useQuery("enrolleds", loadEnrolleds);

  console.log(data)

 
  return (data.results ?? []).map(({ id }) => id);
}

export default useAllEnrolleds;
