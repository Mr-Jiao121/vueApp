<template>

    <div>
        <cmtbox :id="$route.params.id"></cmtbox>
    </div>
</template>
<script>
import cmtbox from '../subcon/comment.vue'
    export default{

    data(){
        return{}
    },
        components:{
        cmtbox
        }
    }
</script>

<style>


</style>