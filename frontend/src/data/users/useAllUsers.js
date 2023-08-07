import { useQuery } from "react-query";
import { loadUsers } from '../../../src/data/api/api'

function useAllUsers() {
  const { data = { results: [] }} = useQuery("results", loadUsers);
  console.log(data)
 
  return (data.results ?? []).map(({ id }) => id);
}

export default useAllUsers;
