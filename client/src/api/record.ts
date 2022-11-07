import { useQuery } from "react-query";
import { useAxios } from "../context/axios-context";
import { RecordsListResponse } from "../types/record";

export const useRecords = (enabled: boolean = true) => {
  const axios = useAxios();

  return useQuery(
    "records",
    async () => {
      return await axios.get<RecordsListResponse, any>("/records");
    },
    { enabled }
  );
};
