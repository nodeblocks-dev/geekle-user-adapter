import {CatalogDefaultAdapterRestSdk} from '@basaldev/blocks-default-adapter-api';
import {crypto} from '@basaldev/blocks-backend-sdk';

export function getEnvString(name: string, defaultValue?: string): string {
    const value = process.env[name] || defaultValue;
    if (typeof defaultValue !== 'undefined' && !value) {
      throw new Error(`${name} not set`);
    }
    return value || '';
  }
  
  export function getEnvBool(name: string, defaultValue = false): boolean {
    const value = process.env[name] || defaultValue;
    if (
      typeof defaultValue !== 'undefined' &&
      typeof defaultValue !== 'boolean' &&
      typeof defaultValue !== 'string'
    ) {
      throw new Error(`${name} not set`);
    }
    return value === 'true' || value === true;
  }
  
  export const catalogDefaultAdapterRestSdk =  new CatalogDefaultAdapterRestSdk(
    getEnvString('ADAPTER_CUSTOM_CATALOG_SITE_URL', ''),
    crypto.generateAppAccessToken(
      {
        authEncSecret: getEnvString('ADAPTER_AUTH_ENC_SECRET'),
        authSignSecret:  getEnvString('ADAPTER_AUTH_SIGN_SECRET'),
      },
      'geekle-supply-user'
    )
  );
  
  