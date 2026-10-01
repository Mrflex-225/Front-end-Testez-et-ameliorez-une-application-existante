export default {
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['babel-plugin-istanbul']
          }
        },
        enforce: 'post',
        include: require('path').join(__dirname, '../src'),
        exclude: [/\.(e2e|spec)\.ts$/, /node_modules/]
      }
    ]
  }
};