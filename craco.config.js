const path = require("path");

module.exports = {
  webpack: {
    // 别名配置
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
};
