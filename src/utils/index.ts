
export const genId = () => {
  return Math.random().toString(36).substr(2, 24);
};

export const pad = (val: string, max: number): string => {
  return val.length < max ? pad(`0${val}`, max) : val;
};

export const  capitalizeFirstLetter = (val: string) => {
  return val.charAt(0).toUpperCase() + val.slice(1);
};

export const minSec = 60;
export const hourSec = minSec * 60;
export const daySec = hourSec * 24;
export const dayMillisec = daySec * 1000;
