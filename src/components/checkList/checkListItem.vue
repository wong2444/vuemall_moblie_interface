<template>

    <div class="goodsItem">
        <input v-if="goods.checked" checked type="checkbox" :name="goods.goods_id" :value="goods.goods_id"
               @click="clickGoods">
        <input v-else type="checkbox" :name="goods.goods_id" :value="goods.goods_id" @click="clickGoods">
        <div><img :src="goods.goods_img" alt="" class="goodsImg"></div>
        <div class="goodsName">{{goods.goods_name}}</div>
        <div class="goodsPrice">$ {{goods.goods_price}}</div>
        <div class="goodsQty" @click="openBuyPanel">x {{goods.goods_qty}}</div>
        <div class="goodsDel"><mt-button @click="handleDelete" type="danger" size="small">刪除</mt-button></div>



        <mt-popup
                v-model="popupVisible"
                popup-transition="popup-fade"
                position="bottom">
            <div class="qty">購買數量</div>
            <mt-picker :slots="slots"  show-toolbar ref="picker">
                <mt-button @click="handleConfirm" type="danger" size="small" style="float:right;margin: 2px">确认</mt-button>
            </mt-picker>

        </mt-popup>

    </div>


</template>

<script>
    import {totalPriceMixin} from "../../common/mixin";
    export default {
        name: "checkListItem",
        mixins: [totalPriceMixin],
        data(){
            return{
                popupVisible:false,
                slots: [
                    {
                        flex: 1,
                        values: [1,2,3,4,5,6,7,8,9,10],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
            }
        },
        props: {
            goods: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            clickGoods() {
                this.goods.checked=!this.goods.checked

                let goodsItem = {

                    checked:this.goods.checked,
                    goodsId:this.goods.goods_id
                }

                this.$emit('checkGoods', goodsItem)
            },
            openBuyPanel(){

                this.popupVisible=true
            },

            handleConfirm() {
                let goodsItem = {
                    qty:this.$refs.picker.getValues()[0],
                    goodsId:this.goods.goods_id
                }
                this.$emit('checkQty', goodsItem)
                this.popupVisible=false
            },
            handleDelete(){
                let goodsItem = {
                    goodsId:this.goods.goods_id
                }
                this.$emit('checkDel', goodsItem)
            }
        },
        mounted() {
            this.getTotalPrice()
        }

    }
</script>

<style scoped>
    .goodsImg {
        width: 50px;
        height: 50px;
        vertical-align: middle;
    }

    .goodsItem {
        font-size: 18px;
        padding: 5px;
        display: flex;
        border-bottom: 1px solid grey;


    }

    .goodsName {
        width: 150px;
        height: 50px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        line-height: 50px;

    }

    .goodsPrice, .goodsQty{
        flex: 1;
        text-align: center;
        line-height: 50px;
    }
    .goodsDel{
        width: 60px;
        padding: 8px 0 0 4px;
        box-sizing: border-box;
    }


</style>
