import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
// import gsiVtLayer from './layers/gsi-vt';
import gsiOptVtLayer from './layers/gsi-opt-vt';

import { parseHash, setPermalink, setPopstate } from './utils/handleHash';
import './style.css';

const { zoom, center, rotation } = parseHash(window);

const map = new Map({
  target: 'map',
  view: new View({
    center: center || fromLonLat([140.46, 36.37]),
    zoom: zoom || 12,
    rotation: rotation || 0,
  }),
  layers: [gsiOptVtLayer],
});

setPermalink(map);
setPopstate(map, window);
