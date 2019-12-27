<template>
    <div>
        <mt-header fixed title="購物車"></mt-header>
        <div class="goodsList">
            <check-list-item v-for="item in $store.getters.cartList" :goods="item"
                             @checkGoods="checkGoods" @checkQty="checkQty" @checkDel="checkDel"></check-list-item>
        </div>

        <div class="switch">
            <div>
                <mt-switch v-model="checkAll" @change="getCheckAll">全選</mt-switch>
            </div>

            <div>
                <span>總價: ${{total}}</span>
                <mt-button size="small" type="primary" style="margin-left: 2px">購買</mt-button>
            </div>
        </div>


    </div>


</template>

<script>
    import checkListItem from '../components/checkList/checkListItem'
    import {totalPriceMixin} from "../common/mixin";

    export default {
        name: "Cart",
        mixins: [totalPriceMixin],
        components: {
            checkListItem
        },
        data() {
            return {
                checkAll: true,


            }
        },
        methods: {

            getCheckAll() {
                if (this.checkAll) {
                    this.$store.getters.cartList.forEach(item => {
                        item.checked = true
                    })
                    this.checkAll = true
                } else {
                    this.$store.getters.cartList.forEach(item => {
                        item.checked = false
                    })
                    this.checkAll = false

                }
                this.getTotalPrice()

            },
            checkGoods(goodsItem) {

                this.$store.getters.cartList.forEach(item => {
                    if (item.goods_id === goodsItem.goodsId) {
                        console.log(goodsItem)
                        item.checked = goodsItem.checked
                    }
                })
                console.log(this.$store.getters.cartList)
                this.getTotalPrice()
            },
            checkQty(goodsItem) {
                this.$store.getters.cartList.forEach(item => {
                    if (item.goods_id === goodsItem.goodsId) {
                        console.log(goodsItem)
                        item.goods_qty = goodsItem.qty
                    }
                })


                this.getTotalPrice()
            },
            async checkDel(goodsItem) {
                let action= await this.$messagebox.confirm('确定刪除商品?').catch(err=>err)
                if(action==='confirm'){
                    let index = this.$store.getters.cartList.findIndex(item => {
                        return item.goods_id === goodsItem.goodsId
                    })
                    this.$store.getters.cartList.splice(index, 1)
                    this.$toast('刪除成功')
                    this.getTotalPrice()
                }else{
                    this.$toast('取消刪除')
                }
            }

        },
        mounted() {
            this.getTotalPrice()
        }
    }
</script>

<style scoped>

    .mint-checklist {
        margin-top: 45px;
    }

    .goodsList {
        margin-top: 40px;
        overflow: scroll;
        position: absolute;
        right: 0;
        left: 0;
        height: 80%;
    }

    .switch {
        width: 100%;
        position: absolute;
        bottom: 60px;
        display: flex;
        justify-content: space-between;
    }

</style>
