<template>
<div class="photoinfo-container">
    <h3 >{{photoinfo.title}}</h3>
    <p class="subtitle">

        <span>发表时间：{{photoinfo.add_time | dataFormat}}</span>
        <span>点击：{{ photoinfo.click}}次</span>
    </p>

    <hr>

<!--    缩略图区域-->
<!--    <img class="preview-img" v-for="(item,index) in list"-->
<!--          :src="item.src" height="100"-->
<!--         @click="$preview.open(index,list)" :key="index">-->

<div class="thumbs">
    <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
</div>
<!--    图片内容区-->
    <div class="content" v-html="photoinfo.content"></div>

<!--    评论子组件-->

    <cmt-box :id="id"> </cmt-box>
</div>
</template>

<script>
    // 导入评论子组件
    import comment from '../subcon/comment.vue'
    export default {
        data(){
            return {
                id:this.$route.params.id,
                photoinfo:{},
                slide1:[]//缩略图
            }
        },
        created(){
this.getPhotoInfo();
this. getThumbs()
        },
        methods:{

            getPhotoInfo(){
                //获取图片的详情
                this.$http.get('api/getImageInfo/'+this.id).then(result=>{
                    if(result.body.status===0){
                        this.photoinfo=result.body.message[0];
                        console.log(this.photoinfo);
                    }
                })

            },
            getThumbs(){

                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if(result.body.status===0){
                        //循环每个图片，补全宽和高
                    result.body.message.forEach(item=>{
                        item.msrc=item.src;
                        // item.w=1200,
                        // item.h=900
                        item.w=600,
                            item.h=400
                    })
                        this.slide1=result.body.message
                    }
                })
            },
            handleClose () {
                console.log('close event')
            }
        },
        components:{
            "cmt-box":comment
        }
    }

</script>

<style lang="less" scoped>
.photoinfo-container {
    padding: 3px;

    h3 {
        color: #226aff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }

    .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }

    .content {
        font-size: 13px;
        line-height: 30px;

    }

    .thumbs {
        /deep/ .my-gallery {

            display: flex;
            flex-wrap: wrap;
            figure {
                width: 30%;
                margin: 5px;
                img {
                    width: 100%;
                    border-radius: 5px;
                    box-shadow: 0 0 8px #666;
                }
            }
        }
    }
}
</style>