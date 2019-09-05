import React, { CSSProperties, FC, RefObject } from 'react';
import { GoogleMap, GoogleMapProps, withGoogleMap, withScriptjs } from 'react-google-maps';
import { Log } from 'utils';
const log = Log('components.Map');

interface IMapProps extends GoogleMapProps {
  mapRef?: RefObject<GoogleMap> | ((instance: GoogleMap | null) => void);
}

const Map: FC<IMapProps> = ({ mapRef, ...props}) => (
  <GoogleMap
    ref={mapRef}
    {...props}
  />
);

const WrappedMap = withScriptjs(withGoogleMap(Map));

interface IWrappedMapProps extends IMapProps {
  style?: CSSProperties;
  token?: string;
}

const defToken = typeof MAPS_TOKEN !== 'undefined' && MAPS_TOKEN ? MAPS_TOKEN : null;
if (defToken) {
  log.info(`api token: ${defToken}`);
}

const WrappedMapWithDefault: FC<IWrappedMapProps> = ({ style, token, ...props}) => {
  const curToken = defToken || token;
  if (!curToken) {
    log.warn('empty google maps token');
    return null;
  }
  return (
    <WrappedMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${curToken}&libraries=geometry`}
      loadingElement={<div style={style} />}
      containerElement={<div style={style} />}
      mapElement={<div style={style} />}
      {...props}
    />
  );
};

export default WrappedMapWithDefault;
