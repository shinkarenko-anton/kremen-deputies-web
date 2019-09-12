import { writeFileSync } from 'fs';
import { reduce } from 'lodash';
import { defDistricts, IDistrict, ILatLng } from './data';

const distritsToMap = (items: IDistrict[]) => {
  const placemarksStr = reduce(items, (memo, item) => {
    const str = districtToKmlPlacemarks(item);
    return memo ? `${memo}\n${str}` : str;
  }, '');
  return `
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Untitled map</name>
    <description/>
    <Style id="poly-000000-1200-77-nodesc-normal">
      <LineStyle>
        <color>ff000000</color>
        <width>1.2</width>
      </LineStyle>
      <PolyStyle>
        <color>4d000000</color>
        <fill>1</fill>
        <outline>1</outline>
      </PolyStyle>
      <BalloonStyle>
        <text><![CDATA[<h3>$[name]</h3>]]></text>
      </BalloonStyle>
    </Style>
    <Style id="poly-000000-1200-77-nodesc-highlight">
      <LineStyle>
        <color>ff000000</color>
        <width>1.8</width>
      </LineStyle>
      <PolyStyle>
        <color>4d000000</color>
        <fill>1</fill>
        <outline>1</outline>
      </PolyStyle>
      <BalloonStyle>
        <text><![CDATA[<h3>$[name]</h3>]]></text>
      </BalloonStyle>
    </Style>
    <StyleMap id="poly-000000-1200-77-nodesc">
      <Pair>
        <key>normal</key>
        <styleUrl>#poly-000000-1200-77-nodesc-normal</styleUrl>
      </Pair>
      <Pair>
        <key>highlight</key>
        <styleUrl>#poly-000000-1200-77-nodesc-highlight</styleUrl>
      </Pair>
    </StyleMap>
    <Folder>
      <name>Untitled layer</name>
      ${placemarksStr}
    </Folder>
  </Document>
</kml>`;
};

const districtToKmlPlacemarks = (item: IDistrict): string => {
  let str: string = '';
  item.polygons.forEach((polygon) => {
    const placemarkStr = polygonToKmlPlacemark(`${item.number}`, polygon.outer);
    str = str ? `${str}\n${placemarkStr}` : placemarkStr;
  });
  return str;
};

const polygonToKmlPlacemark = (name: string, path: ILatLng[]): string => (
`<Placemark>
<name>${name}</name>
<styleUrl>#poly-000000-1200-77-nodesc</styleUrl>
<Polygon>
  <outerBoundaryIs>
    <LinearRing>
      <tessellate>1</tessellate>
      <coordinates>
${pathToKmlCoords(path, 8)}
      </coordinates>
    </LinearRing>
  </outerBoundaryIs>
</Polygon>
</Placemark>`);

const pathToKmlCoords = (path: ILatLng[], indent: number) => {
  const lines: string[] = [];
  for (let i = 0; i <= path.length; i++) {
    const index = i !== path.length ? i : 0;
    const point = path[index];
    const indentStr = getSpaces(indent);
    lines.push(`${indentStr}${point.lng},${point.lat},0`);
  }
  return reduce(lines, (memo, line) => memo ? `${memo}\n${line}` : line, '');
};

const getSpaces = (val: number): string => {
  let str: string = '';
  for (let i = 0; i < val; i++) { str += ' '; }
  return str;
};

writeFileSync('./map.kml', distritsToMap(defDistricts));
