import { Event, Filters } from "../models/Event";

export const getColorByPartido = (partido: string) => {
  switch (partido) {
    case "PN":
      return "cyan lighten-1";
    case "PC":
      return "red lighten-1";
    case "CA":
      return "orange lighten-1";
    case "PG":
      return "green lighten-1";
    case "PI":
      return "purple lighten-1";
    case "MULTI":
      return "grey darken-1";
  }
};

export const filterEvents = (events: Event[], filters: Filters) => {
  let from = events.length - 1;
  let to = 0;
  let toFound = false;
  let filterWords: string[] = [];
  if (filters.filterText) {
    filterWords = filters.filterText.split(" ");
  }
  for (let i = events.length - 1; i >= 0; i--) {
    const dateEvent = new Date(
      parseInt(
        events[i].date[6] +
          events[i].date[7] +
          events[i].date[8] +
          events[i].date[9]
      ),
      parseInt(events[i].date[3] + events[i].date[4]) - 1,
      parseInt(events[i].date[0] + events[i].date[1])
    );
    if (
      filters.dateFrom &&
      new Date(
        parseInt(
          filters.dateFrom[6] +
            filters.dateFrom[7] +
            filters.dateFrom[8] +
            filters.dateFrom[9]
        ),
        parseInt(filters.dateFrom[3] + filters.dateFrom[4]) - 1,
        parseInt(filters.dateFrom[0] + filters.dateFrom[1])
      ) > dateEvent
    ) {
      from--;
    }
    if (
      filters.dateTo &&
      new Date(
        parseInt(
          filters.dateTo[6] +
            filters.dateTo[7] +
            filters.dateTo[8] +
            filters.dateTo[9]
        ),
        parseInt(filters.dateTo[3] + filters.dateTo[4]) - 1,
        parseInt(filters.dateTo[0] + filters.dateTo[1])
      ) < dateEvent &&
      !toFound
    ) {
      to = i + 1;
      toFound = true;
    }
    let hasWord = false;
    if (filterWords.length == 0) {
      hasWord = true;
    }
    for (let j = 0; j < filterWords.length; j++) {
      if (
        events[i].body.toLowerCase().includes(filterWords[j].toLowerCase()) ||
        events[i].title.toLowerCase().includes(filterWords[j].toLowerCase())
      ) {
        hasWord = true;
      }
    }
    if (!hasWord) {
      events.splice(i, 1);
      if (i < from) {
        from--;
      }
      if (i < to) {
        to--;
      }
    } else {
      let hasPartido = false;
      if (filters.partidos.length == 0) {
        hasPartido = true;
      }
      for (let j = 0; j < filters.partidos.length; j++) {
        if (
          events[i].partido == "MULTI" ||
          events[i].partido == filters.partidos[j]
        ) {
          hasPartido = true;
        }
      }
      if (!hasPartido) {
        events.splice(i, 1);
        if (i < from) {
          from--;
        }
        if (i < to) {
          to--;
        }
      }
    }
  }
  events = events.splice(to, from - to + 1);
  return events;
};
