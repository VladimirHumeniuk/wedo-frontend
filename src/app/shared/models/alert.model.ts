export interface Alert {
  status: string;
  message: string;
  adviseUrl?: string;
  closable?: boolean;
}