module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-photo-zoomer/demo/' : '/',
  css: { extract: false }
}
