export type Category = "food" | "clothing" | "housing" | "transportation" | "education" | "entertainment" | "other";

export interface SpendingLabel {
  category: Category;
  name: string;
}
