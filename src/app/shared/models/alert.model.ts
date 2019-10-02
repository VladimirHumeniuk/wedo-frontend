export interface Alert {
  code: string;
  status: string;
  message: string;
  adviseUrl?: string;
  closable?: boolean;
}

export interface AlertData {
  id: string;
  alerts: Alert[];
}