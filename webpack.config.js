module.exports = {
  entry: "./src/index.js",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  module: {
      loaders: [
          { test: /\.css$/, loaders: ["style-loader", "css-loader"] },
          { test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
            presets: ['react', 'es2015']
             }
          },
          {
            test: /.*\.(gif|png|jpe?g|svg)$/i,
            loaders: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                query: {
                  progressive: true,
                  optimizationLevel: 7,
                  interlaced: false,
                  pngquant: {
                    quality: '65-90',
                    speed: 4
                  }
                }
              }
            ]
          },
          {
            test: /\.ico$/,
            loader: "url-loader",
            query: { mimetype: "image/x-icon" }
          }

      ]
  }
};