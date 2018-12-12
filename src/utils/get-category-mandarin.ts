import { Category } from "../typings";

export default (category: Category): string => {
  switch (category) {
    case "food":
      return "食";
    case "clothing":
      return "衣";
    case "housing":
      return "住";
    case "transportation":
      return "行";
    case "education":
      return "育";
    case "entertainment":
      return "樂";
    case "other":
      return "雜";
  }
};
