import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import { Attribution, ScaleLine, defaults as defaultControl } from "ol/control";
import Link from "ol/interaction/Link";
import { geolocation, useGeolocation, GeolocationControl } from "./utils";
import gsiOptVtLayer from "./layers/gsi-opt-vt";
import "./style.css";

const geolocationControl = new GeolocationControl({ geolocation });

const map = new Map({
  target: "map",
  view: new View({
    center: fromLonLat([140.46, 36.37]),
    zoom: 12,
    rotation: 0,
  }),
  layers: [gsiOptVtLayer],
  controls: defaultControl({
    attribution: false,
  }).extend([
    new Attribution({
      collapsible: false,
    }),
    new ScaleLine(),
    geolocationControl,
  ]),
});

map.addInteraction(
  new Link({
    params: ["x", "y", "z"],
    replace: true,
  }),
);

useGeolocation({ map, geolocation });
