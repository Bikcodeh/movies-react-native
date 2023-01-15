import * as RNLocalize from 'react-native-localize';
import {STORAGE_KEYS, getData} from './Storage';

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function isValidScreen(screen: string): boolean {
  switch (screen) {
    case 'movie':
      return false;
    case 'search':
      return false;
    default:
      return true;
  }
}

export function getDeviceLang(code: boolean = false): string {
  if (code) {
    return RNLocalize.getLocales()[0].languageCode;
  } else {
    return RNLocalize.getLocales()[0].languageTag;
  }
}

export const getLang = async (): Promise<string | null> => {
  return await getData(STORAGE_KEYS.LANG);
};

export function parseObject<T>(value: string | null): T | null {
  try {
    if (value !== null) {
      const object = JSON.parse(value) as T;
      return object;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
