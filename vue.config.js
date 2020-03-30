module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-scroll-bar/example/' : '/',
  css: { extract: false }
}
