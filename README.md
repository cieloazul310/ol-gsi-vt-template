# 国土地理院ベクトルタイル + OpenLayers テンプレート with `@cieloazul310/ol-gsi-vt`

国土地理院が提供実験を実施している[ベクトルタイル](https://github.com/gsi-cyberjapan/gsimaps-vector-experiment "地理院地図Vector（仮称）提供実験")及び[最適化ベクトルタイル](https://github.com/gsi-cyberjapan/optimal_bvmap "最適化ベクトルタイル試験公開")を [`@cieloazul310/ol-gsi-vt`] パッケージを使って [OpenLayers] で表示したプロジェクトの作成例です。

## デモ

<https://cieloazul310.github.io/ol-gsi-vt-template/>

## 開発

```shell
$ git clone git@github.com:cieloazul310/ol-gsi-vt-template.git --depth=1
$ cd ol-gsi-vt-template
$ yarn install

# initialize git
$ rm -rf .git
$ git init

# develop
$ yarn run start

# build
$ yarn run build

# format with prettier
$ yarn run format

# deploy to gh-pages
$ yarn run deploy
```

## `@cieloazul310/ol-gsi-vt` パッケージについて

`@cieloazul310/ol-gsi-vt` は、国土地理院が提供するベクトルタイルを設定不要で表示するためのパッケージです。ベクトルタイル、最適化ベクトルタイルのそれぞれに通常、淡色の2種類ずつ、計4種類のプリセットレイヤを搭載しています。

GitHub リポジトリ
<https://github.com/cieloazul310/ol-gsi-vt>

## Tips

### 1. 淡色プリセットを使う

この例では `@cieloazul310/ol-gsi-vt` パッケージに搭載している淡色プリセットレイヤを使います。

```ts
import { gsiOptVtPaleLayer } from '@cieloazul310/ol-gsi-vt';

const optVtLayer = gsiOptVtPaleLayer();

export default optVtLayer;
```

- `gsiOptVtLayer`: 最適化ベクトルタイルの通常レイヤ
- `gsiOptVtPaleLayer`: 最適化ベクトルタイルの淡色レイヤ
- `gsiVtLayer`: ベクトルタイルの通常レイヤ
- `gsiVtPaleLayer`: ベクトルタイルの淡色レイヤ

### 2. テーマを変更して配色を変える

この例ではレイヤの `theme` オプションで地図の配色を変更します。

```ts
import { gsiOptVtLayer, type PaletteOption } from '@cieloazul310/ol-gsi-vt';

const palette: PaletteOptions = {
  road: {
    highway: {
      main: '#ccf',
      edge: '#77a',
    },
  },
};

const optVtLayer = gsiOptVtLayer({
  theme: {
    palette,
  },
});
```

上の例では `road.highway` (高速道路)の道路中心線(`main`)と道路縁(`edge`)の色を変更しています。

### 3. 表示するソースレイヤを選択する

この例ではレイヤの `layers` オプションで最適化ベクトルタイルに含まれるソースレイヤの中から描写する地物を選択します。

```ts
import { gsiOptVtLayer } from '@cieloazul310/ol-gsi-vt';

const optVtLayer = gsiOptVtLayer({
  layers: ['Cntr', 'Cstline', 'WA', 'WL'],
});

export default optVtLayer;
```

上の例では `Cntr` (等高線), `Cstline` (海岸線), `WA` (水域), `WL` (水涯線)を選択して描写しています。

**※注意** 最適化ベクトルタイル(`gsiOptVtLayer`)とベクトルタイル(`gsiVtLayer`)のソースレイヤ名は異なります。詳しくはベクトルタイルの仕様をご覧ください。

### 4. 表示しないソースレイヤを選択する

`@cieloazul310/ol-gsi-vt` パッケージに含まれるヘルパー関数を使って、表示しないソースレイヤを選択します。

```ts
import { gsiOptVtLayer, gsiOptVtLayerExclude } from '@cieloazul310/ol-gsi-vt';

const optVtLayer = gsiOptVtLayer({
  layers: gsiOptVtLayerExclude(['Anno']),
  // =>  ['AdmArea', 'AdmBdry', 'BldA', 'Cntr', 'Cstline', 'Isbt', 'PwrTrnsmL', 'RailCL', 'RailTrCL', 'RdEdg', 'RdCompt', 'RdCL', 'RvrCL', 'SpcfArea', 'StrctLine', 'StrctArea', 'TpgphArea', 'TpgphLine', 'WA', 'WL', 'WStrA', 'WStrL', 'WRltLine']
});

export default optVtLayer;
```

上の例では `Anno` (注記) 以外のレイヤを描写しています。

その他の機能については `@cieloazul310/ol-gsi-vt` パッケージの API リファレンスをご覧ください。

## ベクトルタイルの仕様

地理院地図Vector（仮称）提供実験  
<https://github.com/gsi-cyberjapan/gsimaps-vector-experiment>

最適化ベクトルタイル試験公開  
<https://github.com/gsi-cyberjapan/optimal_bvmap>

国土地理院によるベクトルタイルは提供実験及び試験公開であるため、今後仕様変更や公開終了の可能性があります。留意してください。

[OpenLayers]: https://openlayers.org/ "OpenLayers"
[`@cieloazul310/ol-gsi-vt`]: https://github.com/cieloazul310/ol-gsi-vt "@cieloazul310/ol-gsi-vt"
