import { defineConfig } from "umi";

export default defineConfig({
  base: '/edu-editor/',
  title: "面向教育的MD智能实时编辑器",
  publicPath: '/edu-editor/',
  outputPath: 'edu-editor',
  exportStatic: {},
  esbuildMinifyIIFE: true,
  routes: [
    { path: "/", component: "index" },
  ],
  npmClient: 'yarn',
});
