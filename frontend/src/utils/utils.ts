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
