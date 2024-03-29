import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import { Attribution, ScaleLine, defaults as defaultControl } from "ol/control";
import Link from "ol/interaction/Link";
import Geolocation from "ol/Geolocation";
import { useGeolocation, GeolocationControl } from "./utils";
import { optVtLayer } from "./layers";
import "./style.css";

const geolocation = new Geolocation({
  trackingOptions: {
    enableHighAccuracy: true,
  },
});

const map = new Map({
  target: "map",
  view: new View({
    center: fromLonLat([140.46, 36.37]),
    zoom: 12,
    rotation: 0,
  }),
  layers: [optVtLayer],
  controls: defaultControl({
    attribution: false,
  }).extend([
    new Attribution({
      collapsible: false,
    }),
    new ScaleLine(),
    new GeolocationControl({ geolocation }),
  ]),
});

map.addInteraction(
  new Link({
    params: ["x", "y", "z"],
    replace: true,
  }),
);

useGeolocation({ map, geolocation });
