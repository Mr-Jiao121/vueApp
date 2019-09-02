var path=require('path');
var webpack=require('webpack');
const vueLoaderPlugin=require('vue-loader/lib/plugin');

//导入自动生成HTML文件的插件
var htmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    entry:path.join(__dirname,'src/main.js'),
    output:{
       path: path.join(__dirname,'dist'),//配置文件的输出路径
        filename: "bundle.js"
    },
    plugins:[
        //添加plugins
        new htmlWebpackPlugin({
            template:path.join(__dirname,'src/index.html'),//模板路径
            filename:'index.html' //自动生成html文件的名称
        }),
        new vueLoaderPlugin()
    ],
    // devServer: {
    //     open:true,
    //     port:3000
    // },
    module:{//用来配置第三方loader模块
        rules:[
            //文件的匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.(png|jpg|gif|ttf)$/,use:'url-loader'},
            // {test:/\.js$/,use:'babel-loader', exclude: /node_modules/}
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            {test:/\.vue$/,use:'vue-loader'}//处理.vue文件
        ]
    },
    resolve: {
        alias: {
            // "vue$": "vue/dist/vue.js"

        }
    }


}