<template>

    <div class="newsinfo-container">
    <h1 class="title">{{ newsinfo.title }}</h1>
        <p class="subtitle">
            <span>发表时间:{{ newsinfo.add_time | dataFormat}}</span>
            <span>点击：{{ newsinfo.click}}次</span>
        </p>
        <hr>

<div class="content" v-html="newsinfo.content"></div>

<!--        评论子组件区域-->
        <comment-box :id="this.id">

        </comment-box>


    </div>
</template>

<script>

    //导入子组件
    import comment from '../subcon/comment.vue'

    import {Toast} from 'mint-ui'
export default{
    data(){
        return {
            id:this.$route.params.id,
            newsinfo:{}//新闻对象
            //将url传递过来的url值挂在到data中
        }
    },
    created(){

        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){//获取新闻详情
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status==0){
                    // console.log(result.body.message);
                    this.newsinfo=result.body.message[0];
                    //这里的message是一个对象数组，访问其第一个对象message[0];


                }else{
                    Toast('获取新闻列表失败')

                }

            })

        }
    },
    components:{
        'comment-box':comment
    }

}

</script>


<style lang="less" scoped>
.newsinfo-container{
    padding: 0 5px;
    .title{
        font-size: 14px;
        text-align: center;
        margin: 15px 0;
        color: red;


    }
    .subtitle{
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;

    }
    .content{

        img{
            width: 100%;
        }
    }

}
</style>