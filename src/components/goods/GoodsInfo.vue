<template>
    <div class="goodsinfo-container">

        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

<!--       商品轮播图区域-->


        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">

<!--                    这里lunbotu是变量-->
                    <swiper :lunboList="lunbotu"  :isfull="false"></swiper>

                  </div>
            </div>
        </div>

<!--        商品购买区域-->

        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">

                <p class="price">
                    市场价：<del>￥{{ goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span
                        class="now_price">￥{{ goodsinfo.sell_price}}</span>
                </p>
                    <p>购买数量：&nbsp<number
                            @getcount="getSelectedCount"
                    :max="goodsinfo.stock_quantity"></number></p>

                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small"
                                   @click="add_car">加入购物车
                        </mt-button>

<!--                        //实现加入购物车时候，拿到选择的数量-->
<!--按钮属于goodsinfo页面，数字属于numberbox组件-->
<!--              涉及父子组件嵌套  无法在goodsinfo中获取选中商品的数量值
        子组件想父组件传值-->
                    </p>

                  </div>
            </div>
        </div>

<!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header "></div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                        <p>商品货号:{{ goodsinfo.goods_no}}</p>
                        <p>库存情况:{{ goodsinfo.stock_quantity }}</p>
                        <p>上架时间:{{ goodsinfo.add_time}}</p>

                     </div>
            </div>
            <div class="mui-card-footer">
               <mt-button type="primary"  size="large" plain
               @click="goDesc(id)">图文介绍</mt-button>
<!--                <br>-->
               <mt-button type="danger" size="large" plain
                          @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import swiper from '../subcon/swiper.vue'
    import number from '../subcon/goodsinfo_number.vue'
    export default {
        data(){
            return{
                id:this.$route.params.id,
                lunbotu:[],
                goodsinfo:{},
                ballFlag:false,
                selectedCount:1

            }
        },
        created(){
            this.getLunbotu(),
                this. getGoodsInfo()
        },
        methods:{
            getLunbotu(){
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if(result.body.status===0){

                        // 先循环轮播图数组的每一项
                        // this.lunbotu=result.body.message;
                        // console.log(this.lunbotu);

                        result.body.message.forEach(item=>{
                            item.img=item.src;
                        })
                        this.lunbotu=result.body.message;
                    }

                })

            },
            getGoodsInfo(){
                this.$http.get("api/goods/getinfo/"+this.id).then(result=>{
                    if(result.body.status===0){
                        this.goodsinfo=result.body.message[0];
                    }
                })

            },
            goDesc(id){
                this.$router.push({name:"goodsdesc",params:{id}})

            },
            goComment(id){
                this.$router.push({name:"goodscomment",params:{id}})
            },
            add_car(){
                this.ballFlag=!this.ballFlag
            },
            beforeEnter(el){

                el.style.transform="translate(0,0)";
            },
            enter(el,done){
                el.offsetWidth;
             // el.style.transform="translate(102px,426px)";


                //不能把位移横纵坐标写死
                //1先得到徽标的横纵坐标，再得到小球的横纵坐标
                const ballPosition=this.$refs.ball.getBoundingClientRect();
                const badgePosition=document.getElementById('badge').getBoundingClientRect();
                const xDist=badgePosition.left-ballPosition.left;
                const yDist=badgePosition.top-ballPosition.top;
                // console.log(xDist);
                // console.log(yDist);
                el.style.transform= `translate(${xDist}px, ${yDist}px)`;
             // el.style.transform="translate(+'xDist'+px+'yDist'+px+)"
             el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)";
             done();

            },
            afterEnter(el){
this.ballFlag=!this.ballFlag
            },
            getSelectedCount(count){
this.selectedCount=count;
                console.log('父组件拿到的值'+this.selectedCount);
            }


        },
        components:{
            swiper,
            number
        }
    }
</script>

<style lang="less" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        color: red;
        font-size:10px;
        font-weight: 700;
    }

    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
   .ball{
       width: 15px;
       height: 15px;
       border-radius: 50%;
       background-color: red;
       position: absolute;
       z-index: 99;
       top:403px;
       left:144px;
       /*transform: translate(102px,426px);*/


   }

}

</style>