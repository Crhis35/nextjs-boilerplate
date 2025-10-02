import xior from 'xior';
import { appConfig } from 'config/app-config';

export const restClient = xior.create({
  baseURL: appConfig.apiUrl,
});
