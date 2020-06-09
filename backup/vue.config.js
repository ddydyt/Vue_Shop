module.exports = {
  lintOnSave: false,
  devServer:{
    proxy: {
      '/login':{
        target: "http://localhost:3000/login",
        changeOrigin:true
      }
    }
  }
}