import i18n from '../services/translate.service';

export function getErrorMessageFromCode(code: string): string {
  return i18n.translate(`api.errorCodes.${code}`);
}
