export interface Apod {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  copyright?: string;
}

export type GetApodParamsReq = {
  startDate: string;
  endDate: string;
};
