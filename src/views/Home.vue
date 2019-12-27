<template>
    <div>
        <mt-header fixed title="首頁"></mt-header>
        <mt-swipe :auto="4000">
            <mt-swipe-item><img src="../assets/q.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../assets/vAhUMi-0.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../assets/vAhUMi-1.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../assets/xiaomi.jpg" alt=""></mt-swipe-item>
        </mt-swipe>
        <h1>商品列表</h1>
        <div v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10"
         class="content">

            <good-list :goods="goodsList"/>

        </div>


    </div>
</template>

<script>
    import GoodList from '../components/goods/GoodsList'
    export default {
        name: "Home",
        components: {
            GoodList,
        },
        data(){
            return{
                loading:false,
                goodsList:[],
                queryInfo:{
                    query:'',
                    pagenum:1,
                    pagesize:10
                },
                noMoreData:false,
                scrollTop:99
            }
        },
        methods:{
            loadMore() {
                if(this.noMoreData)return this.$toast('沒有更多商品了');
                this.loading = true;
                this.queryInfo.pagenum = this.queryInfo.pagenum+1
                this.getGoodsList()
                this.loading = false;
            },
            async getGoodsList () {
                const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
                if (res.meta.status !== 200) return this.$toast('線路繁忙');
                if(res.data.goods.length>0){
                    this.goodsList.push(...res.data.goods)
                }else{
                    this.noMoreData=true
                }
                // this.$message.success(res.meta.msg)
            }
        },
        created(){
            this.getGoodsList()
        },
        beforeRouteLeave (to, from, next) {

            this.scrollTop = document.getElementsByClassName('content')[0].scrollTop
            next()
        },
        //进入该页面时，用之前保存的滚动位置赋值
        beforeRouteEnter (to, from, next) {
            next(vm => {
                document.getElementsByClassName('content')[0].scrollTop = vm.scrollTop
            })
        }

    }
</script>

<style scoped>

.content {
    overflow: scroll;
    position: absolute;
    /*只有內容可滾動*/
    top: 310px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>
