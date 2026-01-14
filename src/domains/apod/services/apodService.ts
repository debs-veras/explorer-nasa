import { httpClient } from "../../../shared/services/httpClient";
import type { GetApodParamsReq } from "../types";

export async function getApod(params: GetApodParamsReq) {
  const { data } = await httpClient.get("/planetary/apod", {
    params: {
      start_date: params.startDate,
      end_date: params.endDate,
    },
  });

  return data;
}
