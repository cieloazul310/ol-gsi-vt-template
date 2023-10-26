import {
  gsiOptVtStyle,
  optVtDefaultAttribution,
} from "@cieloazul310/ol-gsi-vt";
import VectorTileLayer from "ol/layer/VectorTile";
import PMTilesVectorSource from "../utils/ol-pmtiles";

/**
 * 最適化ベクトルタイルPMTiles版のレイヤー
 * https://github.com/gsi-cyberjapan/optimal_bvmap
 */
const pmtilesLayer = new VectorTileLayer({
  declutter: true,
  source: new PMTilesVectorSource({
    url: "https://cyberjapandata.gsi.go.jp/xyz/optimal_bvmap-v1/optimal_bvmap-v1.pmtiles",
    attributions: optVtDefaultAttribution,
  }),
  style: gsiOptVtStyle(),
});

export default pmtilesLayer;
