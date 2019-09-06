import  VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopCarContainer from './components/tabbar/ShopCarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'


var router=new VueRouter({
    routes:[
        //配置路由规则
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/member',component: MemberContainer},
        {path:'/search',component:SearchContainer},
        {path:'/shopCar',component: ShopCarContainer},
        {path:'/home/newslist',component: NewsList},
        {path:'/home/newsinfo/:id',component: NewsInfo},
        {path:'/home/photolist',component: PhotoList},
        {path:'/home/photoinfo/:id',component: PhotoInfo},
        {path:'/home/goods/goodslist',component: GoodsList},
        {path:'/home/goods/goodsinfo/:id',component: GoodsInfo,name:'goodsinfo'},
        {path:'/home/goodsdesc/:id',component: GoodsDesc,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component: GoodsComment,name:'goodscomment'},




        ],
    //覆盖默认的路由高亮类
    linkActiveClass:'mui-active'

})
export default router