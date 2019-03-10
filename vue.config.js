module.exports = {
  devServer: {
    //proxy: "http://localhost:3100"
    proxy: {
      //   "^/products": {
      //     target: "http://localhost:3100/",
      //     ws: true,
      //     changeOrigin: false
      //   },
      "^/pdf": {
        target: "https://docs.spring.io/spring-boot/docs/current/reference/"
      }
    }
  }
};
