export type Category = "food" | "clothing" | "housing" | "transportation" | "education" | "entertainment" | "other";
export type PermissionStatus = "undetermined" | "authorized" | "denied" | "restricted";

export interface SpendingLabel {
  id: string;
  category: Category;
  name: string;
  createdAt?: number;
}

export interface SpendingLabelCreateProperties {
  category: Category;
  name: string;
}

export interface SpendingLabelUpdateProperties {
  category?: Category;
  name?: string;
}

export interface Consumption {
  id: string;
  spending: number;
  selectedLabelId: string;
  time: number;
  location: { latitude: number; longitude: number } | null;
  comment: string | null;
  createdAt: number;
}

export interface ConsumptionCreateProperties {
  spending: number;
  selectedLabelId: string;
  time: number;
  location: { latitude: number; longitude: number } | null;
  comment: string | null;
}

export interface ConsumptionUpdateProperties {
  spending?: number;
  selectedLabelId?: string;
  time?: number;
  location?: { latitude: number; longitude: number } | null;
  comment?: string | null;
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
