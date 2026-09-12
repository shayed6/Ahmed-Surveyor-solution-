export type ScreenView = 
  | 'home' 
  | 'land_survey' 
  | 'pantagraph' 
  | 'report_search' 
  | 'deed_search' 
  | 'khatian_search'
  | 'open_booking'
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
