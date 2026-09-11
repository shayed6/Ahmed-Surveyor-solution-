export type ScreenView = 
  | 'home' 
  | 'land_survey' 
  | 'pantagraph' 
  | 'report_search' 
  | 'deed_search' 
  | 'khatian_search'
  | 'open_booking'
  | 'tracking'
  | 'payment'
  | 'my_bookings'
  | 'admin'
  | 'contact_us'
  | 'order_app'
  | 'privacy_policy';

export interface ServiceItem {
  id: string;
  viewId: ScreenView;
  title: string;
  subtitle: string;
  iconType: 'land_survey' | 'pantagraph' | 'report_search' | 'deed_search' | 'khatian_search' | 'open_booking';
  isFullWidth?: boolean;
}

export interface BookingSubmission {
  id: string;
  serviceType: string;
  name: string;
  phone: string;
  date: string;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed';
  details?: Record<string, string>;
  fee?: number;
}
