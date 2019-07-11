import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
  entry: './src/bootstrap.ts',
  target: 'async-node',
  mode: 'production',
  node: {
    global: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'packagist.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
};

export default config;
