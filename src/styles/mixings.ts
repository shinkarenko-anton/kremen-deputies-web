import { IBaseStyle } from './types';

export const fullScreen: IBaseStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

export const screenCenter: IBaseStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
};

export const horizontalCenter: IBaseStyle = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
};

export const threeDots: IBaseStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const fullFixedScreen: IBaseStyle = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};
