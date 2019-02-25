import { each, isArray, isNumber, isString } from 'lodash';
import { IBaseStyles } from './types';

const mergeStylesInArray = (arr: any[]): IBaseStyles => {
  if (!arr) { return {}; }
  const style: IBaseStyles = {};
  each(arr, (item: any) => {
    if (!item) { return; }
    if (isString(item) || isNumber(item)) { return; }
    const styleObj = isArray(item) ? mergeStylesInArray(item) : item as object;
    each(styleObj, (val: any, key: string) => {
      style[key] = val;
    });
  });
  return style;
};

export const m = (...args: any[]): IBaseStyles => {
  return mergeStylesInArray(args);
};

export const px = (val: number): string => `${val}px`;

export { default as colors } from './colors';
export { default as sizes } from './sizes';
export * from './mixings';
export * from './theme';
export * from './types';
