/**
 * 2023 Protomaps All rights reserved.
 * https://github.com/protomaps/PMTiles/blob/main/openlayers/src/index.js
 */

import VectorTile from "ol/VectorTile";
import VectorTileSource, {
  type Options as VectorTileSourceOptions,
} from "ol/source/VectorTile";
import { LoadFunction } from "ol/Tile";
import TileState from "ol/TileState";
import MVTFormat, { type Options as MVTFormatOptions } from "ol/format/MVT";
import Feature from "ol/Feature";

import * as pmtiles from "pmtiles";

export type PMTilesVectorSourceOptions = Omit<VectorTileSourceOptions, "url"> &
  Required<Pick<VectorTileSourceOptions, "url">> & {
    mvtFormatOptions?: MVTFormatOptions;
    headers?: HeadersInit;
  };

export default class PMTilesVectorSource extends VectorTileSource {
  pmtiles: pmtiles.PMTiles;

  // @ts-expect-error
  tileLoadFunction: LoadFunction = (tile: VectorTile, url: string) => {
    // the URL construction is done internally by OL, so we need to parse it
    // back out here using a hacky regex
    const re = /pmtiles:\/\/(.+)\/(\d+)\/(\d+)\/(\d+)/;
    const result = url.match(re);
    const z = result?.[2];
    const x = result?.[3];
    const y = result?.[4];
    if (!x || !y || !z) return;

    tile.setLoader((extent, resolution, projection) => {
      tile.setState(TileState.LOADING);
      this.pmtiles
        .getZxy(parseInt(z, 10), parseInt(x, 10), parseInt(y, 10))
        .then((tile_result) => {
          if (tile_result) {
            const format = tile.getFormat();
            tile.setFeatures(
              format.readFeatures(tile_result.data, {
                extent,
                featureProjection: projection,
              }) as Feature[],
            );
            tile.setState(TileState.LOADED);
          } else {
            tile.setFeatures([]);
            tile.setState(TileState.EMPTY);
          }
        })
        .catch(() => {
          tile.setFeatures([]);
          tile.setState(TileState.ERROR);
        });
    });
  };

  constructor(options: PMTilesVectorSourceOptions) {
    const { mvtFormatOptions, ...vectorSourceOptions } = options;

    super({
      ...vectorSourceOptions,
      ...{
        state: "loading",
        url: `pmtiles://${options.url}/{z}/{x}/{y}`,
        format: new MVTFormat(mvtFormatOptions),
      },
    });

    const fetchSource = new pmtiles.FetchSource(
      options.url,
      new Headers(options.headers),
    );

    this.pmtiles = new pmtiles.PMTiles(fetchSource);
    this.pmtiles.getHeader().then((header) => {
      // @ts-ignore
      this.tileGrid.minZoom = header.minZoom;
      // @ts-ignore
      this.tileGrid.maxZoom = header.maxZoom;
      this.setTileLoadFunction(this.tileLoadFunction);
      this.setState("ready");
    });
  }
}
