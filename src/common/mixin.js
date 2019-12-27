export const totalPriceMixin = {
    data(){
      return {
          total:0
      }
    },
    methods:{
        getTotalPrice() {
            this.total=0
            let checkList = []
            checkList = this.$store.getters.cartList.filter(item => {
                if (item.checked) {
                    return item
                }
            })

            if (checkList.length === 0) {
                this.total = 0
                return
            }
            console.log(checkList)
            checkList.forEach(item=>{
                this.total += item.goods_price * item.goods_qty
            })
            console.log('total',this.total)
        },

    },

}





