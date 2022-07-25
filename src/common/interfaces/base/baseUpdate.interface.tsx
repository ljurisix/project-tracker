import { BaseResponseInterface } from './base.interface';

export interface BaseUpdateResponseInterface extends BaseResponseInterface {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  statisticSelected: string;
  statistics: any | null;
  to: number;
  total: number;
}
