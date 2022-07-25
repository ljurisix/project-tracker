export interface BaseResponseInterface {
  success: boolean;
  message?: string;
  errorCode?: string;
}

export interface SimpleBaseResponseInterface {
  success: boolean;
  message: string;
}
