import { PositionProperty } from 'csstype';
import { CSSProperties } from 'react';

export type CSSPosProp = PositionProperty;
export type IBaseStyle = CSSProperties;
export type ITextStyle = CSSProperties;

export interface IBaseStyles {
  [key: string]: IBaseStyle;
}
