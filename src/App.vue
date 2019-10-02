<template>
  <div id="app">
    <div id="miniCart" v-show="showMiniCart">
      <div class="eachItem" v-for="(item, index) in commoditiesMini" :key="index">
        <span class="miniPic">
          <img src="./assets/classic-tee.jpg" />
        </span>
        <span class="miniDetails">
          <h5>{{item.name}}</h5>
          <div>
            <span>{{item.qty+'x'}}</span>
            <span class="miniPrice">{{item.price}}</span>
          </div>
          <div>{{'Size: ' + item.size}}</div>
        </span>
      </div>
    </div>
    <div class="pageHeader">
      <div
        :class="{myCartPC: !isMobile, myCartMobile: isMobile}"
        @mouseover="cartOver"
        @mouseout="cartOut"
        @click="cartClick"
      >
        <a-icon v-if="isMobile" type="shopping-cart" :style="{'font-weight': 'bolder'}" />
        <span v-else>My Cart</span>
        <span>{{cartInfo}}</span>
      </div>
    </div>
    <div :class="{pageBodyMobile: isMobile, pageBodyPc: !isMobile}">
      <div class="pic">
        <img src="./assets/classic-tee.jpg" />
      </div>
      <div class="summary">
        <h1 class="comName">{{commodityName}}</h1>
        <h2 :class="{priceMobile: isMobile, pricePc: !isMobile}">{{dollarSign+price}}</h2>
        <p class="desc">{{description}}</p>
        <div class="sizeSelector">
          <span class="sizeText">SIZE</span>
          <span class="sizeHint">{{sizeSlected}}</span>
          <div class="sizeBoxContainer">
            <span
              :class="{sizeBoxPc: !isMobile, sizeBoxMobile: isMobile, sizeSlectedBox: sizeSlected=='S'}"
              @click="selectSize('S')"
            >S</span>
            <span
              :class="{sizeBoxPc: !isMobile, sizeBoxMobile: isMobile, sizeSlectedBox: sizeSlected=='M'}"
              @click="selectSize('M')"
            >M</span>
            <span
              :class="{sizeBoxPc: !isMobile, sizeBoxMobile: isMobile, sizeSlectedBox: sizeSlected=='L'}"
              @click="selectSize('L')"
            >L</span>
          </div>
          <div
            :class="{warning: !showWarning, warningShow: showWarning}"
          >Plese select an appropriate size</div>
          <button
            type="button"
            @click="addOnClick"
            :class="{addBtnPc: !isMobile, addBtnMobile: isMobile}"
          >ADD TO CART</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isMobile: false,
      qtyInCart: 0,
      commodityName: "Classic Tee",
      dollarSign: "$",
      price: 75.0,
      description:
        "Dolor site amet, consectetur adipiscing elit. Haec et tu ita posuisti, et verba vestra sunt. Quod autem ratione actum est, id officium appellamus dolor sit amet, consectetur adipiscing elit.  Haec et tu ita posuisti, et verba vestra sunt. Quod autem ratione actum est, id officium appellamus",
      sizeSlected: "",
      showMiniCart: false,
      showWarning: false,
      commoditiesMini: [
        /*  {
          src: "./assets/classic-tee.jpg",
          name: "Classic Tee",
          qty: 1,
          price: "$75.00",
          size: "S"
        },
        {
          src: "./assets/classic-tee.jpg",
          name: "Classic Tee",
          qty: 3,
          price: "$75.00",
          size: "L"
        } */
      ]
    };
  },
  computed: {
    cartInfo() {
      return "( " + this.qtyInCart + " )";
    }
  },
  watch: {
    commoditiesMini: {
      handler(val) {
        this.qtyInCart = 0;
        for (let item of val) {
          this.qtyInCart += item.qty;
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.isMobile = this.deviceQuery();
  },
  methods: {
    cartOver() {
      this.showMiniCart = true;
    },
    cartOut() {
      this.showMiniCart = false;
    },
    cartClick() {
      if (isMobile) {
        this.showMiniCart = !this.showMiniCart;
      }
    },
    addOnClick(e) {
      if (this.sizeSlected != "") {
        let findSame = false;
        for (let item of this.commoditiesMini) {
          if (
            item.name == this.commodityName &&
            item.size == this.sizeSlected
          ) {
            item.qty = item.qty + 1;
            findSame = true;
          }
        }
        if (!findSame) {
          this.commoditiesMini.push({
            src: "./assets/classic-tee.jpg",
            name: this.commodityName,
            qty: 1,
            price: this.dollarSign + this.price,
            size: this.sizeSlected
          });
        }
      } else {
        this.showWarning = true;
      }
    },
    selectSize(size) {
      this.showWarning = false;
      this.sizeSlected = size;
    },
    deviceQuery() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  }
};
</script>

<style>
body {
  margin: 0 !important;
  font-family: Arial, Helvetica, sans-serif;
}
#app {
  position: static;
}
#miniCart {
  position: absolute;
  margin-top: 30px;
  right: 8%;
  width: 18%;
  border: 1px solid#cccccc;
  background-color: #ffffff;
}
.eachItem {
  width: 100%;
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.eachItem > .miniPic {
  width: 25%;
}
.eachItem > .miniPic > img {
  width: 100%;
}
.miniDetails {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  margin-left: 10px;
}
.miniDetails > h5 {
  margin: 0 0 0 0;
  font-size: 10px;
  white-space: nowrap;
}
.miniDetails > div {
  margin-top: 10px;
  white-space: nowrap;
  font-size: 10px;
}
.miniPrice {
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
}
.pageHeader {
  position: static;
  background: #f6f6f7;
  height: 30px;
  width: 100%;
  margin-top: 15px;
}
.myCartPC {
  color: #888888;
  font-size: 11px;
  float: right;
  margin-right: 8%;
  margin-top: 8px;
  cursor: pointer;
}
.myCartMobile {
  color: #888888;
  font-size: 25px;
  float: right;
  margin-right: 8%;
  cursor: pointer;
  line-height: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: flex-start;
}
.myCartMobile > span {
  margin-left: 9px;
  font-size: 18px;
}
.pageBodyMobile {
  position: static;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 0 20px 0 20px;
}
.pageBodyPc {
  margin-top: 40px;
  margin-left: 10%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.pageBodyMobile > .pic {
  width: 100%;
}
.pageBodyMobile > .pic > img {
  width: inherit;
}
.pageBodyPc > .pic {
  width: 36%;
}
.pageBodyPc > .pic > img {
  width: 100%;
}
.summary {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.pageBodyMobile > .summary {
  width: inherit;
}
.pageBodyPc > .summary {
  width: 45%;
  margin-left: 10%;
}
.comName {
  font-size: 20px;
  font-weight: bold;
}
.pricePc {
  border: 1px solid #f8f8f9;
  border-left: none;
  border-right: none;
  margin-top: 10px;
  height: 35px;
  line-height: 35px;
  font-size: 15px;
  font-weight: bolder;
}
.priceMobile {
  margin-top: 10px;
  height: 35px;
  font-size: 35px;
  font-weight: bolder;
}
.desc {
  margin-top: 10px;
  color: #888888;
  font-size: 12px;
  line-height: 20px;
}
.sizeSelector {
  margin-top: 15px;
}
.sizeText {
  color: #888888;
  font-size: 12px;
}
.sizeText:after {
  content: "*";
  color: #c90000;
  font-size: 12px;
}
.sizeHint {
  color: #222222;
  font-size: 12px;
}
.sizeBoxContainer {
  margin-top: 10px;
}
.sizeBoxPc {
  display: inline-block;
  width: 35px;
  height: 35px;
  background: transparent;
  color: #888888;
  font-size: 10px;
  line-height: 35px;
  text-align: center;
  border: 1px solid#cccccc;
  cursor: pointer;
}
.sizeBoxMobile {
  display: inline-block;
  width: 90px;
  height: 90px;
  background: transparent;
  color: #888888;
  font-size: 30px;
  line-height: 90px;
  text-align: center;
  border: 2px solid#cccccc;
  cursor: pointer;
}
.sizeSlectedBox {
  color: #222222;
  border: 2px solid #222222 !important;
}
.warning {
  color: #c90000;
  font-size: 10px;
  visibility: hidden;
}
.warningShow {
  color: #c90000;
  font-size: 10px;
  visibility: visible;
}
.addBtnPc {
  margin-top: 15px;
  width: 150px;
  height: 30px;
  color: #888888;
  border: 2px solid#222222;
  color: #222222;
  font-size: 14px;
  font-weight: bold;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s liner;
  transition: color 0.2s liner;
}
.addBtnMobile {
  margin-top: 30px;
  margin-bottom: 100px;
  width: 350px;
  height: 90px;
  color: #888888;
  border: 2px solid#222222;
  color: #222222;
  font-size: 30px;
  font-weight: bold;
  background-color: transparent;
  outline: none;
}
.addBtnPc:hover {
  background-color: #222222;
  transition: background-color 0.2s linear;
  -moz-transition: background-color 0.2s linear; 
  -webkit-transition: background-color 0.2s linear; 
  -o-transition: background-color 0.2s linear;
  color: #ffffff;
  transition: color 0.2s linear;
  -moz-transition: color 0.2s linear; 
  -webkit-transition: color 0.2s linear;
  -o-transition: color 0.2s linear;
}
</style>
