<template>
<div>
    <!--//height为0-->
    <mt-swipe :auto="1000">
        <!--            //在组件中使用v-for一定要使用key-->


<!--        谁使用此组件，谁传递lunboList-->
        <mt-swipe-item v-for="(item,index) in lunboList" :key="index">

            <img :src="item.img" alt="" :class="{full: isfull}">
        </mt-swipe-item>

    </mt-swipe>
</div>


</template>
<script>
    export default{
        props:["lunboList","isfull"]

    }
</script>
<style lang="less" scoped>
    .mint-swipe{
        height: 200px;

        /*.mint-swipe-item:nth-child(1){*/
        /*    background-color: red;*/
        /*}*/
        /*.mint-swipe-item:nth-child(2){*/
        /*    background-color: greenyellow;*/
        /*}*/
        /*.mint-swipe-item:nth-child(3){*/
        /*    background-color: darkslategray;*/
        /*}*/



        .mint-swipe-item{
            text-align: center;
            /*background-color: transparent;*/

            img{
                /*width: 100%;*/
                height: 100%;
            }


        }

    }
    .full{
        width: 100%;

    }
</style>