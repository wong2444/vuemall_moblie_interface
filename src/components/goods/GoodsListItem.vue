<template>
    <div class="goods-item" @click="itemClick">
        <!--@load圖片加載完成時觸發-->
        <!--:src="showImage"-->
        <img src="@/assets/xiaomi.jpg" alt="">
        <div class="goods-info">
            <p>{{goodsItem.goods_name}}</p>
            <span class="price">{{goodsItem.goods_price}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props: {
            goodsItem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            itemClick(){
                this.$router.push('/detail/'+this.goodsItem.goods_id)
            }
        },
        computed:{
            showImage(){
                return '@/assets/xiaomi.jpg'
            },

        }
    }
</script>

<style scoped>
    .goods-item {
        padding-bottom: 40px;
        position: relative;

        width: 48%;
    }

    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }

    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }

    .goods-info .price {
        margin-right: 20px;
    }

</style>
