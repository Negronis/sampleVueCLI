const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
module.exports = merge(common,{ 
	output:{
		path:path.join(__dirname,'./dist/'),
		filename:'js/[name].js', 
	},
	devtool:'inline-source-map',
	devServer:{
		contentBase:'./dist',
		// hot:true
	},
	plugins:[
		// new webpack.NamedModulesPlugin(), 
		// new webpack.HotModuleReplacementPlugin()
	]
});