export type PartidoEnum = "PN" | "PC" | "CA" | "PI" | "PG" | "MULTI";

export interface Filters {
  partidos: PartidoEnum[];
  dateFrom: string | null;
  dateTo: string | null;
  filterText: string;
}

export interface Event {
  _id: string;
  title: string;
  body: string[];
  sources: string[];
  date: string;
  partido: PartidoEnum;
}
