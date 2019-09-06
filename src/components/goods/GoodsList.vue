<template>


    <div class="goods-list">
<!--a标签跳转-->
<!--        使用window.location.href的形式-->
<!--        <router-link class="goods-item"-->
<!--        v-for="(item,index) in goodslist"-->
<!--            :key="index" :to="'/home/goods/goodsinfo/'+item.id" tag="div">-->
<!--            <img :src="item.img_url" alt="" >-->

<!--            <h1 class="title">{{item.title}}</h1>-->

<!--            <div class="info">-->
<!--                <p class="price">-->
<!--                    <span class="now">￥{{item.sell_price}}</span>-->
<!--                    <span class="old">￥{{item.market_price}}</span>-->
<!--                </p>-->
<!--                <p class="sell">-->
<!--                    <span class="now">热卖中</span>-->
<!--                    <span class="old">剩{{ item.stock_quantity}}件</span>-->
<!--                </p>-->
<!--            </div>-->
<!--        </router-link>-->




        <div class="goods-item"
                     v-for="(item,index) in goodslist"
                     :key="index"
             @click="goDetail(item.id)">
            <img :src="item.img_url" alt="" >

            <h1 class="title">{{item.title}}</h1>

            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span class="now">热卖中</span>
                    <span class="old">剩{{ item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore"> 加载更多</mt-button>

    </div>
</template>
<script>

    export default{
        //data是往自己的组件内部，挂载一些私有数据
        data(){
            return {
            pageIndex:1,
                goodslist:[]
            }
        },
        created(){
this. getGoodsList();
        },
        methods:{
            getGoodsList(){
                //获取商品列表数据

            this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(result=>{
                if(result.body.status===0){

                    //拼接
                    // this.goodslist=result.body.message;

                    // console.log(result.body.message);

                    // for(var i=0;i<result.body.message.length;i++){
                    //     // console.log(1);
                    //
                    //     if(result.body.message[i].img_url.Status==200){
                    //         console.log(1);
                    //     }
                        // console.log(result.body.message[i].img_url);

                    this.goodslist=this.goodslist.concat(result.body.message)

                }


                      // }
            })
            },

            getMore(){
                this.pageIndex++;
                this. getGoodsList();
            },
            goDetail(id){
               // this.router.push("/home/goods/goodsinfo/"+id);
             //this.$route（路由参数对象params query）
                // 和this.$router路由导航对象



//1
           this.$router.push("/home/goods/goodsinfo/"+id)

                //2 传对象
                this.$router.push({path:"/home/goods/goodsinfo/"+id})

                //3传递命名的路由
          this.$router.push({name:"goodsinfo",params:{id}})

            }
        }

    }
</script>

<style lang="less" scoped>

.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 2px;
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #cccccc;
        justify-content: space-between;
        margin: 3px 0;
        padding: 2px;
       display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;


        img{
            width: 100%;

        }
        .title{
font-size: 14px;
        }

        .info{
            /*background-color: #eee;*/
            p{
                margin: 0;
                padding: 5px;
            }
            .price{

                .now{
                    color: red;
                    font-weight: 700;
                    font-size: 16px;

                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;

                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;

            }
        }
    }
}





</style>