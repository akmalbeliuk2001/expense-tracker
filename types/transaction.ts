import { Timestamp } from "firebase/firestore";

export interface DataTransaction {
  id: string;
  category: string;
  createAt: Timestamp;
  date: Timestamp;
  describtions: string;
  nominal: number;
}
