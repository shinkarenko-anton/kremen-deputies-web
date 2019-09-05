import { IConstituency, ILatLng, ILatLngPolygon } from 'core';
import React, { FC } from 'react';
import { Polygon } from 'react-google-maps';
import { colors } from 'styles';
import ConstituencyMarker from './components/ConstituencyMarker';

interface IProps {
  item: IConstituency;
  onClick?: (item: IConstituency) => void;
}

const polygonToPaths = (item: ILatLngPolygon): ILatLng[][] => {
  const paths: ILatLng[][] = [ item.outer ];
  if (item.inner) { paths.push(item.inner); }
  return paths;
};

const ConstituencyPolygon: FC<IProps> = ({ onClick, item }) => {
  const onPolygonClick = () => {
    if (onClick) { onClick(item); }
  };

  const onMarkerClick = () => {
    if (onClick) { onClick(item); }
  };

  return (
    <>
      {item.polygons.map((polygon, index) => (
        <Polygon
          key={`ConstituencyPolygon-${item.id}-${index}`}
          paths={polygonToPaths(polygon)}
          draggable={false}
          options={{
            strokeColor: colors.blue,
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: colors.blue,
            fillOpacity: 0.1,
          }}
          onClick={onPolygonClick}
        />
      ))}
      {item.markers.map((position, index) => (
        <ConstituencyMarker
          key={`ConstituencyMarker-${item.id}-${index}`}
          label={`${item.number}`}
          position={position}
          onClick={onMarkerClick}
        />
      ))}
    </>
  );
};

export default ConstituencyPolygon;
