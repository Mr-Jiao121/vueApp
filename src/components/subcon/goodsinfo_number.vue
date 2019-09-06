<template>

        <div class="mui-numbox" data-numbox-min='1'>
<!--             :data-numbox-max='max'-->

            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number"
                   value="1" @change="countChanged" ref="numbox" />
<!--            //文本框的chang事件-->
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>

</template>
<script>
    import mui from '../../lib/mui/js/mui.min.js'
export default{
    mounted() {
        mui('.mui-numbox').numbox()
        // console.log(mui('.mui-numbox').numbox());
        console.log(this.max);
    },
    methods:{
        countChanged(){
            //文本框的内容被修改，立即传递给父组件
            console.log(this.$refs.numbox.value);

            this.$emit('getcount',parseInt(this.$refs.numbox.value))

        }
    },
    props:["max"],
    //watch监听max值   报错
    watch:{
        max:function(newVal,oldVal){
           mui(".mui-number").numbox().setOption("max",newVal)
        }
    }

}

</script>
<style lang="less" scoped>
    .mui-numbox{
        /*width: 108px;*/
        height: 30px;
    }

</style>