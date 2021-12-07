const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@border-radius-base": "12px", "@primary-color": "#0048FF" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
