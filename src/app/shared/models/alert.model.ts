export interface Alert {
  code: string;
  status: string;
  message: string;
  adviseUrl?: string;
  closable?: boolean;
}