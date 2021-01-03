export enum PartidoEnum {
  "PN",
  "PC",
  "CA",
  "PI",
  "PG",
  "MULTI"
}

export interface Event {
  id: string;
  title: string;
  body: string;
  date: string;
  partido: PartidoEnum;
}
