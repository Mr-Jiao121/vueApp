<template>
    <div>


<!--        轮播图区域-->
<!--//height为0-->
<!--        <mt-swipe :auto="1000">-->
<!--&lt;!&ndash;            //在组件中使用v-for一定要使用key&ndash;&gt;-->
<!--            <mt-swipe-item v-for="(item,index) in lunboList" :key="index">-->

<!--                <img :src="item.img" alt="">-->
<!--            </mt-swipe-item>-->

<!--        </mt-swipe>-->
        <swiper :lunboList="lunboList" :isfull="true"></swiper>

<!--六宫格实现-->
        <ul class=" mui-table-view mui-grid-view mui-grid-9 ">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                <img src="../../img/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link></li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                <img src="../../img/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></router-link></li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goods/goodslist">
                <img src="../../img/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../img/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../img/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../img/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>

        </ul>





    </div>
</template>

<script>
import {Toast} from 'mint-ui'

import swiper from '../subcon/swiper.vue'

    export  default {
        data(){
            return{
                lunboList:[]
            }
        },
        created(){
          this.getLunbotu();
        },
        methods:{

            // // http://www.liulongbin.top:3005
            // this.$http.get('api/getlunbo').then(result=>{

                getLunbotu(){
                this.$http.get("api/getlunbo").then(result=>{
                    console.log(result.body.message);
                    if(result.body.status==0){
                    this.lunboList=result.body.message;
                    }else{
                        Toast('加载轮播图失败')
                    }
                })

            }
        },
        components:{
            swiper
        },

    }

</script>

<style lang="less" scoped>
    /*.mint-swipe{*/
    /*    height: 200px;*/

    /*    !*.mint-swipe-item:nth-child(1){*!*/
    /*    !*    background-color: red;*!*/
    /*    !*}*!*/
    /*    !*.mint-swipe-item:nth-child(2){*!*/
    /*    !*    background-color: greenyellow;*!*/
    /*    !*}*!*/
    /*    !*.mint-swipe-item:nth-child(3){*!*/
    /*    !*    background-color: darkslategray;*!*/
    /*    !*}*!*/



    /*    .mint-swipe-item{*/
    /*        &:nth-child(1){*/
    /*        background-color: greenyellow;*/
    /*    }*/
    /*        &:nth-child(2){*/
    /*            background-color: pink;*/
    /*        }*/
    /*        &:nth-child(3){*/
    /*            background-color: blue;*/
    /*        }*/
    /*        img{*/
    /*            width: 100%;*/
    /*            height: 100%;*/
    /*        }*/
    /*    }*/

    /*}*/
    
    .ul{
        background-color: #fff;
    }

     .mui-grid-view.mui-grid-9{
         background-color: #fff;
         border: none;
         /*border: 0;*/
         .mui-table-view-cell{
             border: 0;
            /*margin: 0 10px;*/
         }
         img{
             width: 60px;
             height: 60px;
         }
         .mui-media-body{
             font-size: 16px;
             font-family: "Microsoft YaHei UI";
         }
     }
</style>