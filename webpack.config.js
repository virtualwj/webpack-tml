const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    devtool: "inline-source-map",
    output: {
        filename: '[name]-[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static:"./public",
        port: 3000,
        hot: true,
        open :true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: [
                  {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                    },
                  },
                ],
                exclude: /node_modules/
              },
              {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },{
                test: /\.less$/,
                use: [
                    "style-loader", 
                    {
                      loader: "css-loader",            
                      options: {
                        importLoaders: 1
                      }
                    }, 
                    "postcss-loader",
                    "less-loader"
                ]
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src')
        },
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HTMLWebpackPlugin({
            // 用于生成的HTML文档的标题
            title: 'Webpack 开发环境配置',
            // webpack 生成模板的路径
            template: './public/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ]
}
