import { gsiOptVtLayer } from "@cieloazul310/ol-gsi-vt";

/**
 * @deprecated
 *
 * 国土地理院による最適化ベクトルタイルの配信はPMTiles形式に移行予定であるため、`gsiOptVtLayer`で使われているファイル形式の配信は2023年度末までの公開を停止が予定されています。PMTiles版のレイヤーをご利用ください。
 * https://github.com/gsi-cyberjapan/optimal_bvmap
 */
const optVtLayer = gsiOptVtLayer();

export default optVtLayer;
