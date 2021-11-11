module.exports = {
  chainWebpack: config => {
    config.module
      .rule("glsl")
      .test(/\.(glsl|frag|vert|vs|fs)$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end()
      .use("glslify-loader")
      .loader("glslify-loader")
      .end()
      .use("glslify-import-loader")
      .loader("glslify-import-loader")
      .end();
  }
};
