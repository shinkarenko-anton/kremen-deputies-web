declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module 'googlemaps';

declare const VERSION: string | undefined;
declare const ENV: 'dev' | 'prod' | undefined;
declare const MAPS_TOKEN: string | undefined;

interface Navigator {
  userLanguage?: string;
  browserLanguage?: string;
  systemLanguage?: string;
}
