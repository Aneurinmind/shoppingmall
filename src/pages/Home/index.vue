<template>
    <div>
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
        <Brand></Brand>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import ListContainer from './ListContainer/index.vue';
import Recommend from './Recommend/index.vue';
import Rank from './Rank/index.vue';
import Like from './Like/index.vue';
import Floor from './Floor/index.vue';
import Brand from './Brand/index.vue';

export default {
    name: "Home",
    components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
    mounted(){
        this.$store.dispatch('getFloorList'),
        this.$store.dispatch("getUserInfo")
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    }
}
</script>

<style lang="less" scoped>
</style>