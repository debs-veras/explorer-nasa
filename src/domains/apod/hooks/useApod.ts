import { useQuery } from "@tanstack/react-query";
import { getApod } from "../services/apodService";
import type { Apod } from "../types";

export function useApodGallery(startDate: string, endDate: string) {
  return useQuery<Apod[]>({
    queryKey: ["apod-gallery", startDate, endDate],
    queryFn: () => getApod({ startDate, endDate }),
    staleTime: 1000 * 60 * 15,
  });
}
