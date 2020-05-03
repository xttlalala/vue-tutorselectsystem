module.exports = {
  //开发配置环境
  devServer: {
    //默认端口
    port: 8081,
    //设置代理
    proxy: {
      "/api/": {
        //目标api地址
        target: "http://localhost:8080",
        //将主机标头的原点更改为目标URL
        changeOrigin: true
      }
    }
  },
  //生产环境配置
  //默认，部署时按服务器下根路径寻找资源
  //编译时资源使用相对路径
  publicPath: "./",
  //编译后不生成map映射文件
  productionSourceMap: false
};
