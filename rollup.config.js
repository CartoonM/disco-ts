const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");

module.exports = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    exports: "named",
    preserveModules: true,
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.build.json",
    }),
    resolve(),
  ],
};
