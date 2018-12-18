export type Category = "food" | "clothing" | "housing" | "transportation" | "education" | "entertainment" | "other";
export type PermissionStatus = "undetermined" | "authorized" | "denied" | "restricted";

export interface SpendingLabel {
  id: string;
  category: Category;
  name: string;
  createdAt?: Date;
}

export interface SpendingLabelUpdateProperties {
  category?: Category;
  name?: string;
}

export interface Consumption {
  id: string;
  spending: number;
  selectedLabelId: string;
  time: Date;
  location: { latitude: number; longitude: number } | null;
  comment: string | null;
  createdAt: Date;
}

export interface AppState {
  global: {
    isFirstTime: boolean;
  };
  setting: {
    autoLocateEnabled: boolean;
  };
  permission: {
    location: PermissionStatus | null;
  };
  spendingLabel: {
    ids: string[];
    byId: { [id: string]: SpendingLabel };
  };
  consumption: {
    ids: string[];
    byId: { [id: string]: Consumption };
  };
}
