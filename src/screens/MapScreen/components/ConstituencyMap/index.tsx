import Map from 'components/Map';
import { IConstituency, ILatLng } from 'core';
import React, { CSSProperties, FC, RefObject } from 'react';
import { GoogleMap } from 'react-google-maps';
import ConstituencyPolygon from './components/ConstituencyPolygon';

interface IProps {
  style?: CSSProperties;
  mapRef?: RefObject<GoogleMap> | ((instance: GoogleMap | null) => void);
  defaultCenter?: ILatLng;
  defaultZoom?: number;
  center?: ILatLng;
  zoom?: number;
  constituencies: IConstituency[];
  onMapClick?: (e: google.maps.MouseEvent | google.maps.IconMouseEvent) => void;
  onMapDblClick?: (e: google.maps.MouseEvent) => void;
  onMapCenterChange?: () => void;
  onMapZoomChange?: () => void;
}

const ConstituencyMap: FC<IProps> = ({
  style, mapRef, defaultCenter, defaultZoom, center, zoom, onMapClick, onMapDblClick, onMapCenterChange,
  onMapZoomChange, constituencies,
}) => {
  return (
    <Map
      style={style}
      mapRef={mapRef}
      defaultCenter={defaultCenter}
      defaultZoom={defaultZoom}
      center={center}
      zoom={zoom}
      onClick={onMapClick}
      onDblClick={onMapDblClick}
      onCenterChanged={onMapCenterChange}
      onZoomChanged={onMapZoomChange}
    >
      {constituencies.map((item) => (
        <ConstituencyPolygon
          key={`ConstituencyPolygon-${item.id}`}
          item={item}
        />
      ))}
    </Map>
  );
};

export default  ConstituencyMap;
