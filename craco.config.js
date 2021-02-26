const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    // 别名配置
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
