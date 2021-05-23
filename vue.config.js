const path = require('path');
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {  
    resolve: {  
      alias: {  
        '@component': path.resolve(__dirname, 'src/components'),  
        '@store': path.resolve(__dirname, 'src/store'),  
        '@plugin': path.resolve(__dirname, 'src/plugins'),  
      },
      extensions: ['.js', '.vue', '.json']
    }, 
  }
}
