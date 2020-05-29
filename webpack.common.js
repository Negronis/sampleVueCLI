const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '/';
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
	entry:'./src/main.js',
	resolve:{
		// 默认路径代理 
		alias: {
			'@': resolve('src')
		}
	},
	plugins:[
		new CleanWebpackPlugin(),
		new CopyPlugin(
			[
				{
					from:path.resolve(__dirname,'./public'),
					to:'./',
					ignore:['.*']
				}
			]
		),
		new HtmlWebpackPlugin({
			template:'./public/index.html',
			inject:true|'body'
		}),
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env.ASSET_PATH':JSON.stringify(ASSET_PATH),
			'process.env.BASE_URL':'/'
		}),
		new ExtractTextPlugin("css/styles.css")
	],
	module:{
		rules:[
			{
				test:/\.css$/,
				use:ExtractTextPlugin.extract({
					fallback:"style-loader",
					use:[
						{
							loader:'css-loader'
						}
					],
					publicPath:'.'
				})
			},
			{
				test:/.(jpg|png|gif|svg|jpeg)$/,
				use:[
					{
						loader:'url-loader', 
						options:{
							name:"./images/[name].[ext]",
							esModule:false,
							limit:10000, 
						}
					}
				],
			},
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,//排除掉node_module目录
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env'] //转码规则
                    }
                }
            },
			{
				test:/\.vue$/,
				loader:'vue-loader'
			}
		]
	}
}