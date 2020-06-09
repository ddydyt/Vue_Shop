module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/login': {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      '/menus': {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      '/users': {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      '/updateUserInfo': {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      'insertUserInfo' : {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      'queryUserInfo' : {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      'addUser' : {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      delUserInfo :{
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
}
