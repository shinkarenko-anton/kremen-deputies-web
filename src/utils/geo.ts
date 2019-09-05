import { ILatLng } from 'core';

export const gLatLngToILatLng = (val: google.maps.LatLng): ILatLng => ({
  lat: val.lat(), lng: val.lng(),
});
