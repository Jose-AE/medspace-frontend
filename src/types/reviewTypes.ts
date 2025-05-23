export interface Review {
  userName: string;
  userPfpPath: string;
  rating: number;
  body: string;
  createdAt: Date;
}

export type ReviewType = "tenant" | "landlord" | "clinic";
