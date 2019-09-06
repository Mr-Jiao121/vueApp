<template>
    <div class="cmt-container">
        <h1>发表评论</h1>
        <hr>
        <textarea placeholder="请输入要评论的内容" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>



<div class="cmt-list">
    <div class="cmt-item" v-for="(item,index) in commentList" :key="index">
        <div class="cmt-title">
           第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time| dataFormat}}
        </div>

        <div class="cmt-body">
            {{  item.content=='undefined'?'从用户很懒，什么也没说':item.content}}

        </div>
    </div>

</div>

        <mt-button type="danger" plain size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                pageIndex:1,
                commentList:[],
                msg:''
            }
        },
        created(){
           this.getComments()
        },
        methods:{



            getComments(){
                this.$http.get("api/getcomments/"+this.id+"?pageindex="+
                    this.pageIndex).then(result=>{
                    if(result.body.status===0){
                        //覆盖数据
                        // this.commentList=result.body.message;
                        //拼接数据
                        this.commentList= this.commentList.concat(result.body.message)
                    }else{
                        Toast("获取评论失败")

                    }
                })
            },
            getMore(){
                this.pageIndex++;
                this.getComments();
            },


            postComment(){

                //校验是否为空
                if(this.msg.trim().length===0){
                    return  Toast('评论数据不能为空')
                }

                //参数1 url
                //参数2 提交给服务器的数据对象
                //参数三 默认表单提交
                this.$http.post("api/postcomment/"+this.$route.params.id,{
                    content:this.msg.trim()
                }).then(function (result) {
                        if(result.body.status===0){
                            var cmt={user_name:'匿名用户',
                                add_time:Date.now(),
                                content:this.msg.trim()
                            };
                            this.commentList.unshift(cmt);
                            // this.pageIndex=1;

                            this.msg="";
                        }

                    }
                )
            }

        },
        props:["id"]

    }

</script>
<style lang="less" scoped>
.cmt-container{
    h1{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: rgba(0.3,0.3,0.3,0.3);

            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;

            }
        }
    }
}
</style>