const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
module.exports = merge(common,{
	output:{
		path:path.join(__dirname,'./dist/'),
		filename:'js/[name].[chunkhash].js'
	},
	optimization:{
		runtimeChunk:{
			name:'manifest'
		},
		splitChunks:{
			cacheGroups:{
				vendors:{
					test:/[\\/]node_modules[\\/]/,
					name:'vendors',
					chunks:'initial'
				}
			}
		}
	},
	plugins:[
		new UglifyJSPlugin(), 
		new webpack.HashedModuleIdsPlugin(),
	]
});