<template>
    <div id="pledge">
        <div class="returnHomeb">
            <div v-for="(list,index) in imgs">
                <img v-lazy="list" alt="">
                <div class="openPledge">
                    <button @click="popupVisible = true">点击立即询价</button>
                </div>
            </div>
            <div style="height: 7.5px;width: 100%;background-color: #edf1ff;"></div>
            <mt-popup v-model="popupVisible" class="mint-popup">
                <div class="mint-popup-scroll">
                    <div class="mint-popup-head">
                        <p>信公提示</p>
                        <p>请如实填写表单，我们在收到表单后会尽快与您联系。</p>
                    </div>
                    <div class="mint-popup-content">
                        <div>
                            <div class="inputParent">
                                <label for="pledgeCode" class="inplab">质押标的股票代码<span class="required">*</span></label>
                                <div class="pledgeBorder">
                                    <input type="tel" v-model="pledgeCode" id="pledgeCode" class="pledgeInput"
                                           @focus="inputFocus($event)" @blur="inputBlur($event)">
                                </div>
                                <p class="promptText" v-show="promptCodeTextS">{{promptCodeText}}</p>
                            </div>
                            <!--select-————————————————————————————————————————————————-->
                            <div class="inputParent">
                                <label for="isControllingShareholder" class="inplab">是否控股股东<span
                                        class="required">*</span></label>
                                <div class="innerCustomerGSelect">
                                    <select v-model="selectedH" @change='changeHolder($event)'
                                            id="isControllingShareholder">
                                        <option :value="list.id" v-for="(list,index) in selectedHolder">
                                            {{list.isSelect}}
                                        </option>
                                    </select>
                                </div>
                                <p class="promptText" v-show="promptIsControllingShareholderS">请选择是否控股股东！</p>
                            </div>
                            <div class="inputParent">
                                <label for="isRestrictedShares" class="inplab">是否限售股<span
                                        class="required">*</span></label>
                                <div class="innerCustomerGSelect">
                                    <select v-model="selectedS" @change='changeShares($event)' id="isRestrictedShares">
                                        <option :value="list.id" v-for="(list,index) in selectedShares">
                                            {{list.isSelect}}
                                        </option>
                                    </select>
                                </div>
                                <p class="promptText" v-show="promptIsRestrictedSharesS">请选择是否限售股！</p>
                            </div>
                            <!--————————————————————————————————————————————————————————-->
                            <div class="inputParent">
                                <label for="pledgedShares" class="inplab">质押股数<span
                                        class="required">*</span></label>
                                <div class="pledgeBorder">
                                    <input type="tel" v-model="pledgedShares" id="pledgedShares" class="pledgeInput"
                                           @focus="inputFocus($event)" @blur="inputBlur($event)" maxlength="7" width="79%">
                                    <div class="inputUnits">万股</div>
                                </div>
                                <p class="promptText" v-show="pledgedSharesTextS">请输入质押股数！</p>
                            </div>
                            <!---->
                            <div class="inputParent">
                                <label for="expectedPledgeRate" class="inplab">期望质押率</label>
                                <div class="pledgeBorder">
                                    <input type="number" v-model="expectedPledgeRate" id="expectedPledgeRate"
                                           class="pledgeInput" @focus="inputFocus($event)" @blur="inputBlur($event)" width="87%">
                                    <div class="inputUnits">%</div>
                                </div>
                            </div>
                            <!---->
                            <div class="inputParent">
                                <label for="expectedInterestRate" class="inplab">期望利率</label>
                                <div class="pledgeBorder">
                                    <input type="number" v-model="expectedInterestRate" id="expectedInterestRate"
                                           class="pledgeInput" @focus="inputFocus($event)" @blur="inputBlur($event)" width="87%">
                                    <div class="inputUnitsPop">%</div>
                                </div>
                            </div>
                            <!---->
                            <div class="inputParent">
                                <label for="contacts" class="inplab">联系人<span class="required">*</span></label>
                                <div class="pledgeBorder">
                                    <input type="text" v-model="contacts" id="contacts" class="pledgeInput"
                                           @focus="inputFocus($event)" @blur="inputBlur($event)">
                                </div>
                                <p class="promptText" v-show="contactsTextS">请输入联系人！</p>
                            </div>
                            <!---->
                            <div class="inputParent">
                                <label for="contactNumber" class="inplab">联系电话<span
                                        class="required">*</span></label>
                                <div class="pledgeBorder">
                                    <input type="tel" v-model="contactNumber" id="contactNumber" class="pledgeInput"
                                           @focus="inputFocus($event)" @blur="inputBlur($event)">
                                </div>
                                <p class="promptText" v-show="contactNumberTextS">{{contactNumberText}}</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                    <div class="mint-popup-foot">
                        <button @click="popupVisible = false">取消</button>
                        <button @click="addEquityPledge">提交</button>
                    </div>
                </div>
            </mt-popup>
        </div>
        <!---->
        <div class="matteShow" v-show="matteSh">
            <div class="snake-circle rules-circle"></div>
        </div>
        <div class="returnHome" @click="return_Home">
            <span>主页</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'pledge',
    data() {
      return {
        briefs: '',
        imgs: [],
        popupVisible: false,
        selectedH: "0",
        selectedS: "0",
        /**/
        promptCodeTextS: false,//
        contactsTextS: false,
        contactNumberTextS: false,
        matteSh: false,
        pledgedSharesTextS: false,
        /**/
        contactNumberText: "请输入正确的号码！",
        promptCodeText: '请输入正确的股票代码！',
        pledgeCode: "",//代码
        pledgedShares: '',//质押股数
        expectedPledgeRate: '',//期望质押率
        expectedInterestRate: '',//期望利率
        contacts: '',//联系人
        contactNumber: '',//联系电话
        selectedHolder: [
          {"id": "0", "name": "false", "isSelect": "请选择"},
          {"id": "1", "name": "true", "isSelect": "是"},
          {"id": "2", "name": "false", "isSelect": "否"},
        ],
        selectedShares: [
          {"id": "0", "name": "false", "isSelect": "请选择"},
          {"id": "1", "name": "true", "isSelect": "是"},
          {"id": "2", "name": "false", "isSelect": "否"},
        ],
        user_Id: '',
        positionCode: false,
        promptIsControllingShareholderS: false,
        promptIsRestrictedSharesS: false,

      }
    },
    created() {
      //取到路由传值
      if (this.$route.query.advert_Title !== undefined) {
        var adverttitles = decodeURI(decodeURI(this.$route.query.advert_Title));
        /*$('title').text(adverttitles);*/
        document.title = adverttitles;
      } else {
        var adverttitles = "小安指南";
      }
      this.briefs = this.$route.query.advert_Id;
    },
    updated() {
      this.heightht();
    },
    mounted() {
      /**
       * todo
      **/
      var adverttitle = "股票质押一站式服务，省时省力省心省钱！";
      var sharelink2 = window.location.href;//分享链接
      var shareDesc = "";//描述
      this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
      /**/
      this.aimg();
      var user_id = this.$cookie.getCookie("userId");
      this.user_Id = user_id;
      this.userHome();
    },
    methods: {
      userHome() {
        if (this.user_Id.length == 0 || this.user_Id == '') {
          console.log("没有userId");
        } else {
          this.$http({
            method: 'GET',
            url: this.$api.host + "userHome",
            params: {}
          }).then((res) => {
            console.log('getWxInfo:', res);
            if (res.data.returnCode == 1) {
              if (res.data.returnObject.companyCode != "" || res.data.returnObject.companyCode != null) {
                this.positionCode = true;
                this.pledgeCode = res.data.returnObject.companyCode;
              }
              console.log("returnObject", this.pledgeCode);
            } else {
            }
          }).catch((err) => {
              console.error(err);
          })
        }
      },
      //确认
      addEquityPledge() {
        var selectedH, selectedS;
        if (this.selectedH == 1) {
          selectedH = "true"
        } else if (this.selectedH == 2) {
          selectedH = "false"
        } else {
          selectedH = "-1";
          this.promptIsControllingShareholderS = true;
        }
        //this.selectedH == 1 ? selectedH = "true" : selectedH = "false";
        //this.selectedS == 1 ? selectedS = "true" : selectedS = "false";
        if (this.selectedS == 1) {
          selectedS = "true"
        } else if (this.selectedS == 2) {
          selectedS = "false"
        } else {
          selectedS = "-1";
          this.promptIsRestrictedSharesS = true;
        }
        console.log(selectedH, selectedS, this.pledgeCode, /*//代码*/this.pledgedShares, /*//质押股数*/this.expectedPledgeRate, /*//期望质押率*/this.expectedInterestRate, /*//期望利率*/this.contacts, /*//联系人*/this.contactNumber);
        /*代码判断*/
        if (this.pledgeCode.trim().length == 0 || this.pledgeCode.trim() == "") {
          this.promptCodeText = "请输入股票代码！";
          this.promptCodeTextS = true;
        } else {
          let regExpCode = /^(((002|000|300|600|601|603|900|200)[\d]{3})|60[\d]{4})$/;
          var isCode = regExpCode.test(this.pledgeCode);
          if (isCode == false) {
            this.promptCodeText = "请输入正确的股票代码！";
            this.promptCodeTextS = true;
          } else {
            this.promptCodeTextS = false;
          }
        }
        console.log(123);
        /*质押股数判断*/
        if (this.pledgedShares.trim().length == 0 || this.pledgedShares.trim() == "") {
          this.pledgedSharesTextS = true;
        } else {
          this.pledgedSharesTextS = false;
        }
        console.log(456);
        /*联系人判断*/
        if (this.contacts.trim().length == 0 || this.contacts.trim() == "") {
          this.contactsTextS = true;
        } else {
          this.contactsTextS = false;
        }
        console.log(789);
        /*联系人电话判断*/
        if (this.contactNumber.trim().length == 0 || this.contactNumber.trim() == "") {
          this.contactNumberText = "请输入联系电话！";
          this.contactNumberTextS = true;
        } else {
          let regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
          var isReg = regExp.test(this.contactNumber);
          if (isReg == false) {
            this.contactNumberText = "请输入正确的号码！";
            this.contactNumberTextS = true;
          } else {
            this.contactNumberTextS = false;
          }
        }
        console.log("012");
        /**/
        if (this.contactNumberTextS == false && this.contactsTextS == false && this.promptCodeTextS == false && this.pledgedSharesTextS == false) {
          this.matteSh = true;
          if (selectedS != "-1" && selectedH != "-1") {
            this.$http({
              method: 'POST',
              url: this.$api.host + "equity/addEquityPledge",
              params: {
                code: this.pledgeCode,
                isControllingShareholder: selectedH,
                isRestrictedShares: selectedS,
                pledgedShares: this.rmoney(this.pledgedShares),
                expectedPledgeRate: this.expectedPledgeRate,
                expectedInterestRate: this.expectedInterestRate,
                contacts: this.contacts,
                contactNumber: this.contactNumber,
              }
            }).then((res) => {
              if (res.data.returnCode == 1) {
                setTimeout(() => {
                  this.matteSh = false;
                  this.popupVisible = false;
                  this.$toast({message: '提交成功，谢谢参与！', position: 'center', duration: 1500});
                }, 1500)
              } else {
                this.matteSh = false;
                this.$toast({message: '网络连接错误', position: 'center', duration: 1500});
              }
              console.log(res);
            }).catch(() => {
              this.matteSh = false;
              this.$toast({message: '网络连接错误', position: 'center', duration: 1500});
            })
          } else {
            this.promptIsControllingShareholderS = true;
            this.promptIsRestrictedSharesS = true;
          }
        } else {
          /**/
          //this.$toast({message: '网络连接错误', position: 'center', duration: 1500});
          console.log(1231432345235423 + "===>");
        }
      },
      inputFocus(ele) {
         var el = ele.currentTarget;
        var elId = $(el)[0].id;
        // this.$const.androidTop(elId);
        console.log(el, elId);
        $("#" + elId).parent().css({"border": "1px solid #ffb148"});
        if (elId == "contactNumber") {
          this.contactNumberTextS = false;
        } else if (elId == "pledgeCode") {
          /*代码判断*/
          this.promptCodeTextS = false;
        } else if (elId == "pledgedShares") {
          /* $(el).attr("type", "number");*/
          this.pledgedShares = this.rmoney(this.pledgedShares);
          $(el).css({"width": "79%"});
          this.pledgedSharesTextS = false;
        } else if (elId == "contacts") {
          /*联系人判断*/
          this.contactsTextS = false;
        } else if (elId == "expectedInterestRate") {
          $(el).css({"width": "87%"});
        } else if (elId == "expectedPledgeRate") {
          $(el).css({"width": "87%"});
        }
      },
      //强制输入0-9和点
      rmoney(number) {
        if (number.length <= 0) {
          return (number == '' ? '' : number);
        } else {
          var ret = (number + "").replace(/[^\d\.-]/g, "");
          return parseFloat(ret);
        }
      },
      ImpArr(array) {
        for (let i = 0; i < array.length; i++) {
          if (array[i] === "" || typeof(array[i]) === "undefined") {
            array.splice(i, 1);
            i = i - 1;
          }
        }
      },
      fmoney(number) {
        number = String(number);
        var ngmer = '';
        number = number.replace(/\,/g, "");
        //console.log(number);
        if (isNaN(number) || number == "") {
          number = "";
        } else {
          number = Math.round(number * 100) / 100;
          if (number < 0) {
            ngmer = ('-' + this.outputdollars(Math.floor(Math.abs(number) - 0) + '') + this.outputcents(Math.abs(number) - 0));
          } else {
            ngmer = (this.outputdollars(Math.floor(number - 0) + '') + this.outputcents(number - 0));
          }
        }
        return ngmer
      },
      //格式化金额
      outputdollars(number) {
        var mod, output
        if (number.length <= 3) {
          return (number == '' ? '' : number);
        } else {
          mod = number.length % 3;
          output = (mod == 0 ? '' : (number.substring(0, mod)));
          for (var i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0)) {
              output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            } else {
              output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
            }
          }
          return (output);
        }
      },
      outputcents(amount) {
        amount = Math.round(((amount) - Math.floor(amount)) * 100);
        return (amount < 10 ? '.0' + amount : '.' + amount);
      },
      inputBlur(ele) {
        var el = ele.currentTarget;
        var elId = $(el)[0].id;
        elId = elId.trim();
        console.log(el, elId);
        $("#" + elId).parent().css({"border": "0.5px solid #e3e3e3"});
        /**/
        if (elId == "contactNumber") {
          if (this.contactNumber.trim().length == 0 || this.contactNumber == "") {
            this.contactNumberText = "请输入电话号码！";
            this.contactNumberTextS = true;
          } else {
            let regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
            var isReg = regExp.test(this.contactNumber);
            if (isReg == false) {
              this.contactNumberText = "请输入正确的号码！";
              this.contactNumberTextS = true;
            } else {
              this.contactNumberTextS = false;
            }
          }
        } else if (elId == "pledgeCode") {
          /*代码判断*/
          if (this.pledgeCode.trim().length == 0 || this.pledgeCode == "") {
            this.promptCodeText = "请输入股票代码！";
            this.promptCodeTextS = true;
          } else {
            let regExpCode = /^(((002|000|300|600|601|603|900|200)[\d]{3})|60[\d]{4})$/;
            var isCode = regExpCode.test(this.pledgeCode);
            if (isCode == false) {
              this.promptCodeText = "请输入正确的股票代码！";
              this.promptCodeTextS = true;
            } else {
              this.promptCodeTextS = false;
            }
          }
        } else if (elId == "pledgedShares") {
          console.log("3432432", this.pledgedShares);
          /*$(el).attr("type", "text");*/
          if (this.pledgedShares.trim().length == 0 || this.pledgedShares == "") {
            this.pledgedSharesTextS = true;
          } else {
            this.pledgedSharesTextS = false;
            /*$(el).attr("type", "text");*/
            //this.pledgedShares = parseInt(this.pledgedShares);
            if (!isNaN(this.pledgedShares)) {
              this.pledgedShares = parseInt(this.pledgedShares);
              this.pledgedShares = this.fmoney(this.pledgedShares);
            } else {
              this.pledgedShares = 0;
            }
          }
        } else if (elId == "contacts") {
          /*联系人判断*/
          if (this.contacts.trim().length == 0 || this.contacts == "") {
            this.contactsTextS = true;
          } else {
            this.contactsTextS = false;
          }
        } else if (elId == "expectedPledgeRate") {
          var re = /^[0-9]+.?[0-9]*$/;
          if (!re.test(this.expectedPledgeRate)) {
            //alert("请输入数字(例:0.02)");
            this.expectedPledgeRate = "";
          }
        } else if (elId == "expectedInterestRate") {
          var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字  //判断正整数 /^[1-9]+[0-9]*]*$/
          if (!re.test(this.expectedInterestRate)) {
            //alert("请输入数字(例:0.02)");
            this.expectedInterestRate = "";
          }
        }
      },
      changeHolder(ele) {
        var optionTxt = $(ele.target).find("option:selected").text();
        optionTxt = optionTxt.trim();
        var optionVal = ele.target.value;
        optionVal = optionVal.trim();
        console.log(optionTxt, optionVal, $(ele.target));
        if (optionVal != "0") {
          this.promptIsControllingShareholderS = false;
          //this.promptIsRestrictedSharesS = true;
        } else {
          this.promptIsControllingShareholderS = true;
        }
      },
      changeShares(ele) {
        var optionTxt = $(ele.target).find("option:selected").text();
        optionTxt = optionTxt.trim();
        var optionVal = ele.target.value;
        optionVal = optionVal.trim();
        console.log(optionTxt, optionVal, $(ele.target));
        if (optionVal != "0") {
          this.promptIsRestrictedSharesS = false;
        } else {
          this.promptIsRestrictedSharesS = true;
        }
      },
      heightht() {
        var hei = document.querySelector(".mint-popup").clientHeight;
        var ghg = (hei - 40 - 65) + "px";
        document.querySelector(".mint-popup-content").style.height = ghg;
        if (this.popupVisible == true) {
          $('.returnHomeb').css({"overflow": "hidden"});
          var hpop = document.querySelector(".mint-popup").clientHeight;
          document.querySelector(".mint-popup").style.height = (hpop + "px");
        } else {
          $('.returnHomeb').css({"overflow": "auto"});
          if (this.positionCode == true) {
            this.pledgedShares = '';//质押股数
            this.expectedPledgeRate = '';//期望质押率
            this.expectedInterestRate = '';//期望利率
            this.contacts = '';//联系人
            this.contactNumber = '';  //联系电话
            this.selectedH = "0";
            this.selectedS = "0";
            this.promptCodeTextS = false;//
            this.contactsTextS = false;
            this.contactNumberTextS = false;
            this.pledgedSharesTextS = false;
            this.promptIsControllingShareholderS = false;
            this.promptIsRestrictedSharesS = false;
          } else {
            this.pledgeCode = '';//代码
            this.pledgedShares = '';//质押股数
            this.expectedPledgeRate = '';//期望质押率
            this.expectedInterestRate = '';//期望利率
            this.contacts = '';//联系人
            this.contactNumber = '';  //联系电话
            this.selectedH = "0";
            this.selectedS = "0";
            this.promptCodeTextS = false;//
            this.contactsTextS = false;
            this.contactNumberTextS = false;
            this.pledgedSharesTextS = false;
            this.promptIsControllingShareholderS = false;
            this.promptIsRestrictedSharesS = false;
          }
        }
        console.log(this.positionCode);
      },
      //详情跳转到法规的主页
      return_Home() {
        this.$router.push({path: "/Law", query: {MathTime: global.timestamp}});
      },
      aimg() {
        this.$http({
          method: 'GET',
          url: this.$api.host + "getAdvertImg",
          params: {
            advertId: this.briefs,
          }
        }).then((res) => {
          console.log(res);
          this.imgs = res.data.returnObject;
        }).catch((err) => {
            console.error(err);
        })
      },
    }
  }
</script>

<style>
    image[lazy=loading] {
        width: 40px;
        height: 40px;
        margin: auto;
        opacity: 0;
    }
    #pledge {

    }
    #pledge .mint-popup {
        width: 90%;
        height: 88%;
        background-color: #fff;
        border-radius: 2px;
        overflow: hidden;
        box-shadow: none;
        font-size: 0;
        border: none;
        transform: translateX(-50%) translateY(-50%);
    }
    #pledge .mint-popup > div {
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        height: 100%;
        font-size: 15px;
    }
    #pledge .mint-popup .mint-popup-head {
        height: 65px;
        width: 100%;
        background-color: #4f5d97;
        color: white;
    }
    #pledge .mint-popup .mint-popup-head p {
        font-size: 15px;
        text-align: center;
        padding-top: 5px;
    }
    #pledge .mint-popup .mint-popup-head p + p {
        font-size: 13px;
    }
    #pledge .mint-popup .mint-popup-content {
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;

    }
    #pledge .mint-popup .mint-popup-content > div {
        box-sizing: border-box;
        padding: 15px 12px 15px 12px;
    }
    #pledge .mint-popup .mint-popup-foot {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 40px;
        font-size: 0;
        width: 100%;
        border-top: 1px solid #e3e3e3;
        background-color: #4f5d97;
        /*box-shadow: 0 0 1px rgba(0, 0, 0, 1);*/
    }
    #pledge .mint-popup .mint-popup-foot button {
        display: inline-block;
        width: 50%;
        height: 40px;
        font-size: 15px;
        border: none;
        box-sizing: border-box;
        color: #4f5d97;
        background-color: white;
        line-height: 40px;
        float: left;
        text-align: center;
    }
    #pledge .mint-popup .mint-popup-foot button:active {
        opacity: 0.8;
    }
    #pledge .mint-popup .mint-popup-foot button + button {
        background-color: #4f5d97;
        color: white;
    }
    #pledge .openPledge {
        box-sizing: border-box;
        width: 100%;
        height: auto;
        padding: 12.5px 25px;
        background-color: #edf1ff;
    }
    #pledge .openPledge button {
        height: 45px;
        width: 100%;
        background-color: #4f5d97;
        border: 0;
        color: white;
        font-size: 17px;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
    }
</style>

<style scoped>
    #pledge {
        width: 100%;
        height: 100%;
        font-size: 0;
        vertical-align: middle;
        background-color: #edf1ff;
    }
    #pledge img {
        background-color: white;
        width: 100%;
        height: 100%;
        z-index: 100;
    }
    /**/
    #pledge .inputParent {
        width: 100%;
        font-size: 0;
        display: inline-block;
        padding-bottom: 10px;
        position: relative;
    }
    #pledge .pledgeBorder {
        width: 55%;
        display: inline-block;
        height: 40px;
        border: 0.5px solid #e3e3e3;
        box-sizing: border-box;
    }
    #pledge .required {
        color: #ffb148;
    }
    #pledge .inplab {
        display: inline-block;
        font-size: 15px;
        color: #323232;
        width: 45%;
        text-align: right;
        box-sizing: border-box;
        padding-right: 3%;
        overflow: hidden;
        position: relative;
        top: 5px;
    }
    #pledge .pledgeInput {
        display: inline-block;
        height: 38px;
        font-size: 15px;
        box-sizing: border-box;
        width: 95%;
        line-height: 38px;
        border-radius: 2px;
        -webkit-appearance: none;
        box-shadow: none;
        border: 0;
        text-align: right;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        padding: 10px 0;
    }
    #pledge .innerCustomerGSelect {
        display: inline-block;
        width: 55%;
        height: 40px;
        outline: none;
        box-sizing: border-box;
        color: #8d8d8d;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
        border: 0.5px solid #e3e3e3;
        border-radius: 2px;
        position: relative;
        padding: 0 5px 0 5px;
        /**/
    }
    #pledge .innerCustomerGSelect select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdEMzEwQzgyODNCRDExRTdBQjI5RUMwNjU5QzU4OTQ0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdEMzEwQzgzODNCRDExRTdBQjI5RUMwNjU5QzU4OTQ0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0QzMTBDODA4M0JEMTFFN0FCMjlFQzA2NTlDNTg5NDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0QzMTBDODE4M0JEMTFFN0FCMjlFQzA2NTlDNTg5NDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5dNZRQAAACLUlEQVR42uyau04CQRSGZwfDEhQKkoXCAmi4JBDRxkpeQF9AY+3lidTehBfwBbCzMWAIdlgQG2yRAAm7nh/YhJAQYZnBHZw/+YEFFuaby2HOcox2u82gj1YrSHc35HNygbzH/KsuuUGukO9PyuUhnjQAQyD79PiJXDJNk4VCIXrF8C+K47B+v88GgwGOauQzAvo0nqtVjMgL57xkxeMsHA4zVdTr9dhXp8Ns267T4TGnm2uMiGogENqLdpMOyFeAucDUUg1kFgjtBwdgjsZrRGFN238ImKDh58W+hHgggDuTsy2ShtEwGkbDaBgNo2H+I8zOqieMRiPWbDbdxEiqotEoy2Qy8mACtKlLJpOsVquNwWQJ23p8j/Rphh7L5XLSQNBhxWLRzVPkr5k4ZXipVEoKDDoqEolsNgCk0+kxlEit85lcRC9i2onQuqPNRczvQqGw8vyWsQ65qMgDoMAkfd34+cJ/NL32rNfIJX0H4GXO5/N5T5FrI9uZVaIR3mtZlr/3ZstEuEQiIfx3SgrMbxEOoNlsVp1d86IIJSpybTwFmI9wIiPXn+QzCAZY6KIjl5AUwIuw0DFKsVhsOzJN2SD6GoCG0TAaRsNoGA2zIszQcRylIezJldUuYF5RVKOypu1vAKaCi+AoqlFRaPf0In4FMA/kOqqDVANyq5pIb+BYWG8mIxMUJfz7MFNvhvKs03G92Vwl4C35EnkUedfHg/JNfic/ku/cSsAfAQYAAeaWqY5lYbgAAAAASUVORK5CYII=) no-repeat right center;
        background-size: 17px;
        border-radius: 0;
        width: 100%;
        height: 100%;
        border: 0;
        outline: none;
        font-size: 15px;
        color: rgba(50, 50, 50, 1);
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
        padding: 0 11% 0 58%;
        margin-top: 0;
        box-sizing: border-box;
        text-align: right;
    }
    #pledge .promptText {
        font-size: 12px;
        color: rgba(255, 0, 0, 1);
        padding: 5px 0 0 45%;
    }
    #pledge .inputUnits {
        font-size: 15px;
        color: #323232;
        position: absolute;
        right: 1.5%;
        top: 9px;
    }
    #pledge .inputUnitsPop {
        font-size: 15px;
        color: #323232;
        position: absolute;
        right: 1.5%;
        top: 10px;
    }
    /**/
    .returnHomeb {
        width: 100%;
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        font-size: 0;
        vertical-align: middle;
    }
    /**/
    #pledge .matteShow {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        overflow: hidden;
        z-index: 3000;
    }
    .snake-circle {
        height: 14px;
        width: 14px;
        -webkit-animation: snake-rotate 0.8s infinite linear;
        animation: snake-rotate 0.8s infinite linear;
        border: 2px solid transparent;
        border-radius: 50%;
        border-top-color: rgb(252, 199, 127);
        border-left-color: rgb(252, 199, 127);
        border-bottom-color: rgb(252, 199, 127);
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    @keyframes snake-rotate {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    /*返回首页*/
    .returnHome {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(0, 0, 0, .44);
        color: #fff;
        text-align: center;
        position: absolute;
        bottom: 65px;
        line-height: 33px;
        right: 25px;
        z-index: 10;
        font-family: PingFangSC-Semibold, sans-serif, Microsoft Yahei, Helvetica;
        font-size: 11px;
        overflow: hidden;
    }
    /*home的返回按钮*/
    .returnHome span {
        display: block;
        width: 24px;
        padding-top: 13px;
        height: 8.5px;
        margin: 6px auto 0;
        background-image: url(/static/img/rules/home.png);
        background-size: contain;
        background-repeat: no-repeat;
    }
</style>
