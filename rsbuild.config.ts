import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  source: {
    entry: {
      "page-a": {
        import: "./src/page-a",
      },
      "page-b": {
        import: "./src/page-b",
      },
    },
    tsconfigPath: "./tsconfig.json",
  },
  html: {
    template: "./src/html/template.html",
    templateParameters: {
      titleEnv: process.env.NODE_ENV,
    },
  },
  output: {
    filename: {
      js: "[name].js",
    },
    distPath: {
      root: "./dist/libs",
      jsAsync: "chunks",
      js: "",
      css: "",
      html: "",
    },
    inlineStyles: true,
    polyfill: "off",
    sourceMap: {
      js: process.env.CI ? "hidden-source-map" : "source-map",
    },
  },
  performance: {
    chunkSplit: {
      strategy: "all-in-one",
    },
  },
  plugins: [
    pluginReact({
      swcReactOptions: {
        development: isDev,
        refresh: isDev,
      },
    }),
  ],
  tools: {
    // bundlerChain(chain, { CHAIN_ID }) {
    //   chain.plugin(CHAIN_ID.PLUGIN.REACT_FAST_REFRESH).tap(([options]) => {
    //     return [
    //       {
    //         ...options,
    //         exclude: [/\/src\/generate-title\.js$/],
    //       },
    //     ];
    //   });
    // },
  },
});
