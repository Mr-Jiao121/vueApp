//入口文件
import Vue from 'vue'


import VueRouter from 'vue-router'


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)

}
//安装路由
Vue.use(VueRouter);

//定义全局过滤器
import moment from 'moment'
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD hh:mm:ss"){
    return moment(dataStr).format(pattern)

})







//倒入vue-resource
import  VueResource from 'vue-resource'
//安装vue-resource
Vue.use(VueResource);

//安装图片预览插件
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)




Vue.http.options.root=' http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON='true'

//导入App根组件
import app from './App.vue'

//导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//按需导入mint-ui中的组件
// import { Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'
//
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name,Swipe);
// Vue.component(SwipeItem.name,SwipeItem);
// Vue.component(Button.name,Button);
// Vue.use(Lazyload)
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//导入自己的router.js模块
import router from './router'


var vm=new Vue({
    el:'#app',
    //渲染组件
    render:c=>c(app),
    router//挂在路由对象到vm实例上
})
