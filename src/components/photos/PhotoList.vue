<template>
    <div>

<!--        顶部滑动条-->

        <div id="slider" class="mui-slider ">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item' , item.id==0 ? 'mui-active':'']"
                       v-for="(item,index) in cates" :key="index" @click="getPhotoListByCateId(item.id)">
                        {{item.title}}
                    </a>

                </div>
            </div>

        </div>


<!--图片列表区域-->

        <ul class="photo-list">
            <router-link v-for="(item,index) in list" :key="index"
            :to="'/home/photoinfo/'+item.id"  tag="li">
<!--                默认渲染为a标签-->
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <p class="info-body">{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
    //导入mui的js文件
    import mui from '../../lib/mui/js/mui.min.js'
    //严格模式 报错 在初始化导入mui.js
    //mui.js 用到了caller callee arguments
    //但webpack打包好的bundle.js中，默认启用严格模式，所以冲突

    //将webpack严格模式在打包时禁言



    export default{
        data(){
            return {
                cates:[],
                list:[]
            }
        },

        created(){
          this.getAllCategory();
          //默认进入页面请求所有链接数据
          this. getPhotoListByCateId(0)
        },
        mounted() {
            //当组件中的DOM结构被渲染好
            //如果要操作元素，在mounted中，当前的元素是最新的
            mui('.mui-scroll-wrapper').scroll({
                deceleration:0.0005
            })
        },
        methods:{
            getAllCategory(){
                //获取所有图片分类
                this.$http.get('api/getimgcategory').then(result=>{
                    if(result.body.status===0){
                        result.body.message.unshift({title:"全部",id:0});

                        this.cates=result.body.message;
                        // console.log(this.cates);
                    }
                })


            },
            getPhotoListByCateId(cateId){
                //根据分类id，获取图片列表

                this.$http.get('api/getimages/'+cateId).then(result=>{
                    if(result.body.status==0){
                        this.list=result.body.message
                    }
                })
            }
        }


    }
</script>
<style lang="less" scope>

    .photo-list{
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        li{
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            position: relative;
            img{
                width: 100%;
                vertical-align: middle;
                box-shadow: 0 0 6px #ccc;


            }
            .info{
                color: white;
                text-align: left;
                background-color:rgba(0,0,0,0.3);
                position: absolute;
                bottom: 0;
                overflow: hidden;
                max-height:84px;
                .info-title{
                    font-size: 14px;

                }
                .info-body{
                    font-size: 13px;

                }
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
        }
    }


</style>