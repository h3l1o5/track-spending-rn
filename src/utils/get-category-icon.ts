import { Category } from "../typings";

export default (category: Category): string => {
  switch (category) {
    case "food":
      return "🍞";
    case "clothing":
      return "👕";
    case "housing":
      return "🏠";
    case "transportation":
      return "🚗";
    case "education":
      return "📚";
    case "entertainment":
      return "😁";
    case "other":
      return "❓";
  }
};
