<template>
    <div>
        <mt-header fixed title="商品詳情">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>

        </mt-header>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="img in goodsData.pics"><img :src="img.pics_mid" alt=""></mt-swipe-item>

        </mt-swipe>
        <h2>商品參數</h2>
<table style="width: 100%">
    <thead>
    <tr>
        <th>屬性</th>
        <th>參數</th>
    </tr>

    </thead>
    <tbody>
    <tr>
        <td>名稱</td>
        <td>{{goodsData.goods_name}}</td>
    </tr>
    <tr>
        <td>價格</td>
        <td>$ {{goodsData.goods_price}}</td>
    </tr>
    <tr>
        <td>數量</td>
        <td>{{goodsData.goods_number}}</td>
    </tr>
    </tbody>
</table>
        <h2>商品描述</h2>
        <div class="desc" v-html="goodsData.goods_introduce"></div>
        <mt-button type="primary" class="buyBtn" @click="openBuyPanel">購買</mt-button>
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
    export default {
        name: "Detail",
       data(){
            return{
                goodsData:{},
                popupVisible:false,
                slots: [
                    {
                        flex: 1,
                        values: [1,2,3,4,5,6,7,8,9,10],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ]
            }
       },
        methods:{
            async getGoodsDataById(){
                const {data:res}=await this.$http.get(`goods/${this.$route.params.id}`)
                if (res.meta.status !== 200) return this.$toast('線路繁忙');
                this.goodsData=res.data
            },
            openBuyPanel(){
                if(this.goodsData.goods_number<=0)return this.$toast('商品已售罄')
                this.popupVisible=true
            },

            handleConfirm() {
                let buyData={"goods_id":this.goodsData.goods_id,
                "goods_name":this.goodsData.goods_name,
                "goods_price":this.goodsData.goods_price,
                "goods_qty":this.$refs.picker.getValues()[0],
                "goods_img":this.goodsData.pics[0].pics_sma}
                this.$store.dispatch('addCart',buyData)
                this.popupVisible=false
                this.$toast('加入購物車成功')

            }
        },
        created(){
            this.getGoodsDataById()
        },



    }
</script>

<style scoped>
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        text-align: center;
        padding: 5px;
    }
    .desc{
        font-size: 16px;
        color: grey;
        overflow: scroll;
        /*只有內容可滾動*/
        margin-bottom: 49px;
    }
    .buyBtn{
        position: fixed;
        bottom: 0px;
        width: 100%;
        height: 50px;
        z-index: 99;

    }

</style>
