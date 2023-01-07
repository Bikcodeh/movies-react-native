/* eslint-disable no-extend-native */
import {BASE_URL_IMG} from '../constants';

declare global {
  interface String {
    applyImageUrl(): string;
  }
}

String.prototype.applyImageUrl = function (): string {
  return `${BASE_URL_IMG}${this}`;
};

export {};
