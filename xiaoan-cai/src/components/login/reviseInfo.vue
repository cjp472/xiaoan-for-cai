<template>
  <div class="cont" id="contrev-info">
    <div class="box">
      <div class="baseinfo">
        <div class="nickname">
          <span>用户名<i style="color: #ffb148;">*</i></span>
          <input type="text" v-model="nickname" @change="nick" placeholder="默认微信名"
                 @focus="showx" @blur="hidex">
          <b @click="()=>{this.nickname='';this.isnickname=false;}" v-show="this.nickname.length>0"
             class="bbb"></b>
        </div>
        <p class="nickErr must" v-show="!isnickname">
          请输入用户名！
        </p>
        <div class="username">
                    <span>
                        姓&emsp;名
                        <i>*</i>
                    </span>
          <input type="text" placeholder="请输入真实姓名" id="username" @change="user" v-model="realname"
                 @focus="showx1" @blur="hidex1">
          <b @click="()=>{this.realname='';this.isusername=false;}" v-show="this.realname.length>0"
             class="bbb1"></b>
        </div>
        <p class="userErr must" v-show="!isusername">
          请输入真实姓名
        </p>
        <div class="email">
                    <span>
                        邮&emsp;箱
                        <i style="opacity: 0">*</i>
                    </span>
          <input type="email" placeholder="请输入工作邮箱" id="email" @change="regEmail" v-model="emailAddress"
                 @focus="showx2">
          <b @click="()=>{this.emailAddress=''}" v-show="this.emailAddress.length>0" class="bbb2"></b>
        </div>
        <p class="emailErr" v-show="!emailshow && this.emailAddress.length!==0">
          邮箱格式错误
        </p>
      </div>
      <hr>
      <div class="company">
        <div class="company-sort">
                    <span>
                        公司类型
                        <i>*</i>
                    </span>
          <div class="sortbox">
            <select id="company-1" v-model="Oneid" @change="onechange()" class="one">
              <option :value="v.id" v-for="v in sortOne">{{v.name}}</option>
            </select>
            <select id="company-2" v-model="Twoid" @change="twochange()" class="two">
              <option :value="v.id" v-for="v in sortTwo">{{v.name}}</option>
            </select>
          </div>
        </div>
        <p class="sortErr" style="display: none" v-show="!sortshow">请输入正确的公司类型！</p>
        <div class="ccode " v-show="codeShow">
          <div class="company-code">
                        <span>
                            公司代码
                            <i>*</i>
                        </span>
            <input type="text" :placeholder="codePlaceholder" id="companyCode" @change="codeReg"
                   v-model="comCode"
                   @focus="showx3" @blur="hidex3">
            <b @click="()=>{this.comCode='';this.code=false}" v-show="this.comCode.length>0"
               class="bbb3"></b>
          </div>
          <p class="codeErr must" v-show="!code">
            <!--请输入正确的公司代码！-->
            {{codeErrMsg}}
          </p>
        </div>
        <div class="company-all">
                    <span>
                        公司名称
                        <i>*</i>
                    </span>
          <input type="text" placeholder="请输入公司全称" id="fullname" @change="isFull" v-model="allname"
                 @focus="showx4" @blur="hidex4">
          <b @click="()=>{this.allname='';this.fullname=false}" v-show="this.allname.length>0"
             class="bbb4"></b>
        </div>
        <p class="fullErr must" v-show="!fullname">
          请输入正确的公司名称！
        </p>
      </div>
      <hr>
      <div class="address">
        <div class="position">
                    <span>
                        职&emsp;位
                        <i style="opacity: 0">*</i>
                    </span>
          <div class="jobsort" style="position: relative">
            <select @change="getJobname" id="getJob" v-model="jobId">
              <option :value="item.id" v-for="item in jobList" v-model="jobname">{{ item.name }}</option>
            </select>
            <div class="jobtext">{{ jobNameShow }}</div>
          </div>
        </div>
        <div class="company-address">
                <span>
                    公司地址
                    <i style="opacity: 0">*</i>
                </span>
          <div class="areabox">
            <select class="pro" v-model="pid" @change="prochange()">
              <option :value="v.id" v-for="v in pro">{{v.name}}</option>
            </select>
            <select class="city" v-model="cid" @change="citychange()">
              <option :value="v.id" v-for="v in city">{{v.name}}</option>
            </select>
            <template v-if="county.length>0">
              <select class="county" v-model="ccid" @change="districtChange()">
                <option :value="v.id" v-for="v in county">{{v.name}}</option>
              </select>
            </template>
          </div>
        </div>
        <textarea class="textarea" placeholder="请输入公司详细地址" v-model="fullAdress"></textarea>
      </div>
    </div>
    <div class="complete pass" @click="completes()">
      <div v-if="subText == true">保&ensp;存</div>
      <div v-else-if="subText == false">完成注册</div>
    </div>
  </div>
</template>
<script>
  import area_data from '../../assets/area_data.js'

  export default {
    name: "reviseInfo",
    data() {
      return {
        subText: true,
        nickname: "",//微信昵称
        realname: "",//真实姓名
        emailAddress: "",//邮箱地址
        isnickname: true,//是否填写用户名
        isusername: true,//真实姓名 是否正确
        emailshow: true,//邮箱地址 是否正确
        sortAll: [],//公司类型库
        sortOne: "",//一级公司类型
        sortonename: "",//一级公司类型名称
        sorttwoname: "",//二级公司类型名称
        sortTwo: "",//二级公司类型
        sortshow: false,//公司类型 是否正确
        Oneid: "",//一级公司ID
        Twoid: "",//二级公司ID
        comCode: "",//公司代码
        code: true,//公司代码 是否正确
        codeShow: true,//公司代码一栏是否显示
        allname: "",//公司全称
        fullname: true,//公司全称 是否正确
        jobList: [],
        jobId: "",//职位ID
        jobname: "",//职位名称
        jobNameShow: '',//ios上不显示出来，怎么办
        fullAdress: "",//公司详细地址
        all: area_data,
        pro: "",
        city: "",
        county: "",
        pid: "",
        cid: "",
        ccid: "",
        province: "",
        selectcity: "",
        district: "",
        fromUserIds: '',
        codePlaceholder: '请输入公司代码',
        codeErrMsg: '请输入正确的公司代码！'

      }
    },
    created() {
      if (this.$route.query.id == 1) {
        document.title = '完善个人信息';
        this.subText = false;
      } else if (this.$route.query.id == 2) {
        document.title = '修改个人信息';
        this.subText = true;
      }
      /* this.heigh();*/
    },
    mounted() {
      /**/
      let user_id = this.$cookie.getCookie("userId");
      console.log(user_id);
      /**/
      this.pro = this.all.pro;
      this.pid = this.pro[0]['id'];
      this.prochange();
      /**/

      this.$http.get(this.$api.host + 'userHome').then((res) => {
        console.log(res.data.returnObject);
        let info = res.data.returnObject;
        this.nickname = info.userName;//微信昵 称
        this.realname = info.realName;//真实姓名
        this.emailAddress = info.email == null ? "" : info.email;//邮箱地址
        this.fullAdress = info.companyStreet; //公司详细地址
        this.comCode = info.companyCode; //公司代码
        this.allname = info.companyName; //公司全称
        this.jobname = info.position; //职位名称
        if (info.position == '' || info.position == null) {
          this.jobname = '请选择'
        }
        this.jobNameShow = this.jobname;
        this.sortonename = info.companyTypeOne;   //公司类型
        this.sorttwoname = info.companyTypeTwo;

        this.$nextTick(() => {
          this.pid = info.provinceId;
          this.cid = info.cityId;
          this.ccid = info.areaId;
          this.prochange(this.cid, this.ccid);    //公司地址
          console.log('省市区：', this.pid, this.cid, this.ccid)
        }, 10);
        /**/
        console.log("fullAdress", this.fullAdress);
        this.$nextTick(() => {
          this.pid = info.provinceId;
          this.cid = info.cityId;
          this.ccid = info.areaId;
          this.prochange(this.cid, this.ccid);    //公司地址
          console.log('省市区：', this.pid, this.cid, this.ccid)
        }, 10);

        this.getUserCompanyInfo()
        this.getUserPosition()

      }).catch((err) => {
        console.error(err)
      })
      this.$nextTick(() => {
        this.machine();
      })
    },
    methods: {
      machine() {
        var user = "";
        var h = document.body.clientHeight;
        if (/android/i.test(navigator.userAgent)) {
          //  android
          user = "1";
          $(".jobtext").hide();//andriod 让职位信息的覆盖层div隐藏出来
          $("input").css('padding', '10px 5px');
          window.onresize = function () {
            if (document.body.clientHeight < h) {
              $('.complete').hide();
              /*$('.box').css({'height': "100%"});*/
              /*alert('1',document.body.clientHeight)*/
            } else {
              $('.complete').show();
              /*$('.box').css({'height': "90%"});*/
            }
            var hei = document.body.clientHeight;
            var ghg = (hei - 50) + "px";
            $('.box').height(ghg);
          };
          $(".sortbox>select").css({color: '#323232', fontFamily: " PingFangSC-Light, sans-serif"})
          $(".jobsort>select").css({color: '#323232', fontFamily: " PingFangSC-Light, sans-serif"})
          $(".areabox>select").css({color: '#323232', fontFamily: " PingFangSC-Light, sans-serif"})
        }
        if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
          //  ios
          user = "0"
          /*alert(user)*/
          $(".sortbox>select").css({color: '#323232', fontFamily: " PingFangSC-Light, sans-serif"})
          $(".jobsort>select").css({color: '#323232', fontFamily: " PingFangSC-Light, sans-serif"})
          $(".areabox>select").css({color: '#323232', fontFamily: " PingFangSC-Light, sans-serif"})
          $(".sortbox").css({padding: '10px 5px 10px 5px'})
          $(".jobsort").css({padding: '10px 5px 10px 0px'})
          $(".areabox").css({padding: '10px 5px 10px 5px'})
          $('input').css({'padding': '8px 9% 8px 5px', 'color': "#323232"})
          $("select").css({'padding-right': "17px", "margin-top": '0px', 'line-height': '18px'})
        }
      },
      nick() {
        $(".bbb").css('display', 'none')
        let value = this.nickname;
        this.nickname = value;
        console.log("微信昵称" + this.nickname)
        // if(/^\s*$/.test(this.nickname)) {
        if (this.nickname.length == 0) {
          this.isnickname = false;
          $(".nickErr").show();
        } else {
          this.isnickname = true;
          $(".nickErr").hide();
        }
      },
      hidex() {
        if (this.nickname.length == 0) {
          $(".nickErr").text('请输入用户名！').show();
        }
      },
      showx() {
        if (this.nickname.length > 0) {
          $('.bbb').show();
        }
        $(".nickErr").hide();
      },
      user: function () {
        $(".bbb1").css('display', 'none')
        let content = $("#username").val();
        this.realname = content;
        if (!/^\s*$/.test(content) && content.length < 20) {
          this.isusername = true;// console.log("不显示")
          $(".userErr").hide();
        } else {
          this.isusername = false;
          $(".userErr").show();
        }
        console.log("真实姓名" + this.realname)
      },
      hidex1() {
        if (!/^\s*$/.test(content) && content.length < 20) {
          this.isusername = true;// console.log("不显示")
          $(".userErr").hide();
        } else {
          this.isusername = false;
          $(".userErr").show();
        }
      },
      showx1() {
        if (this.realname.length > 0) {
          $('.bbb1').show();
        }
        $(".userErr").hide();
      },
      regEmail: function () {
        $(".bbb2").css('display', 'none')
        let emailtext = $("#email").val();
        this.emailAddress = emailtext;
        let regExp = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        /*/^([a-z0-9\，\。\,\.\@\!\#\$\%\^\&\-\_\=\+\<\>\/\*\(\)]){6,30}$/i*/
        this.emailshow = regExp.test(emailtext);
      },
      showx2() {
        if (this.emailAddress.length > 0) {
          $('.bbb2').show();
        }
      },
      onechange(twoid) {
        // this.sortTwo = this.sortAll.sortTwo[this.Oneid];
        this.sortTwo = this.getCompanyInfoTwo(this.Oneid)
        this.Twoid = twoid || this.sortTwo[0]['id'];
        // this.Twoid == '11' ? $(".sortErr").show() : $(".sortErr").hide();
        for (var i = 0; i < this.sortOne.length; i++) {
          if (this.sortOne[i].id == this.Oneid) {
            this.sortonename = this.sortOne[i].name;
          }
        }
        for (var j = 0; j < this.sortTwo.length; j++) {
          if (this.sortTwo[j].id == this.Twoid) {
            this.sorttwoname = this.sortTwo[j].name;
          }
        }
        this.canInputCode()
        this.code = true
        $(".codeErr").hide();
      },
      twochange: function () {
        console.log(this.Oneid)
        console.log(this.Twoid)
        this.Twoid == '11' ? $(".sortErr").show() : $(".sortErr").hide();
        for (var i = 0; i < this.sortTwo.length; i++) {
          if (this.sortTwo[i].id == this.Twoid) {
            this.sorttwoname = this.sortTwo[i].name;
          }
        }
        this.canInputCode()
        this.code = true
        $(".codeErr").hide();
      },
      codeReg: function () {
        $(".bbb3").css('display', 'none')
        let codetext = $("#companyCode").val();
        let regExp = /^[0-9]{5,6}$/;
        this.code = regExp.test(codetext);
        console.log('reg', this.code)
        this.code ? $(".codeErr").hide() : $(".codeErr").show();
        this.codeIsErr()
        if (!this.code) {
          return false
        }
        if (this.comCode.length !== 0 && this.code) {
          this.$http.get(this.$api.host + 'getStockCode?companyCode=' + this.comCode)// *http://192.168.52.80:8080/v1/*/
            .then((res) => {
              if (res.data.returnCode == 1) {
                // *console.log("查询成功！");*/
                this.allname = res.data.returnObject;
                this.codeErrMsg = ''
                this.fullname = true;
                $(".fullErr").hide();
              } else {
                // *console.log('未查询成功！')*/
                this.code = false;
                $(".codeErr").show();
                this.codeErrMsg = res.data.returnMsg
                this.allname = ''
                console.log(this.code)
                this.fullname = false;
                $(".fullErr").text('请填写公司名称').show();
                let text = $("#fullname").val();
                let textLength = text.length;
                if (textLength > 0 && textLength < 50) {
                  console.log("hide")
                  this.fullname = true;
                  $(".fullErr").hide();
                } else {
                  this.fullname = false;
                  $(".fullErr").show();
                }
              }
            }).catch((err) => {
            console.error(err)
          })
        }
      },
      hidex3() {
        this.codeIsErr()
      },
      showx3() {
        if (this.comCode.length > 0) {
          $('.bbb3').show();
        }
        $(".codeErr").hide();
      },
      isFull() {
        $(".bbb4").css('display', 'none')
        let text = $("#fullname").val();
        let textLength = text.length;
        console.log(textLength)
        if (textLength > 0 && textLength < 50) {
          console.log("hide")
          this.fullname = true;
          $(".fullErr").hide();
        } else {
          this.fullname = false;
          $(".fullErr").show();
        }
      },
      hidex4() {
        if (this.allname.length == 0) {
          $(".fullErr").text('请输入公司名称！').show();
        } else {
          $(".fullErr").text('请输入正确的公司名称！')
        }
      },
      showx4() {
        if (this.allname.length > 0) {
          $('.bbb4').show();
        }
        $('.fullErr').hide();
      },
      getJobname() {
        let options = $("#getJob option:selected");
        this.jobId = options.val();
        this.jobname = options.text();
        console.log("jobname=" + this.jobname, 'jobId=' + this.jobId)
        this.jobNameShow = this.jobname;
      },
      prochange: function (cityId, districtId) {
        this.city = this.all.city[this.pid];
        this.cid = cityId || this.city[0]['id'];
        this.county = this.all.county[this.cid];
        if (this.county.length > 0) {
          this.ccid = this.county[0]['id'];
        }
        this.$nextTick(() => {
          this.province = $(".pro option:selected").text();
          this.citychange(districtId);
          console.log(this.pid, this.province)
        });
      },
      citychange: function (districtId) {
        this.county = this.all.county[this.cid];
        if (!districtId) {
          if (this.county.length > 0) {
            this.ccid = this.county[0]['id'];
          }
        } else {
          if (this.county.length > 0) {
            this.ccid = districtId;
          }
        }
        this.selectcity = $(".city option:selected").text();
        this.$nextTick(() => {
          this.districtChange();
          console.log(this.cid, this.selectcity)

        })
      },
      districtChange: function () {
        this.district = $(".county option:selected").text();
        console.log(this.ccid, this.district)
      },
      completes: function () {
        this.sortTwo[0].id !== '11' ? this.sortshow = true : this.sortshow = false;
        //console.log("this.sortshow="+this.sortshow)
        this.sortTwo[0].id !== '11' ? $(".sortErr").hide() : $(".sortErr").show();
        var modelArr = [this.nickname, this.realname, this.comCode, this.allname];
        let must = $(".must");
        let j = [];
        for (var i = 0; i < modelArr.length; i++) {
          if (modelArr[i].length == 0) {
            j.push(i)
            must.eq(i).show();
            $(".box").scrollTop($(".must").eq(j[0]).offset().top - 40) //滚动条位置滚动到公司代码栏位置 8.22版本修改
          } else {
            must.eq(i).hide();
          }
        }
        console.log('this.code:' + this.code)
        this.codeIsErr()
        if (this.code == false || this.codeErrMsg == '没有对应公司名称！') {
          $(".codeErr").show();
          return false
        } else {
          $(".codeErr").hide();
        }
        let text = $("#fullname").val();
        let textLength = text.length;
        console.log(textLength)
        if (textLength > 0 && textLength < 50) {
          console.log("hide")
          this.fullname = true;
          $(".fullErr").hide();
        } else {
          this.fullname = false;
          $(".fullErr").show();
        }
        if (this.codeShow == false) {
          this.comCode = "";
        }
        if (window.localStorage.getItem("fromUserId") === null) {
          this.fromUserIds = '';
        } else {
          this.fromUserIds = window.localStorage.getItem("fromUserId");
        }
        /* 如果公司类型为上市公司，未填公司代码的情况下点击完成注册，提示信息  8.22版本修改以下 */
        if (this.codeShow == true && this.comCode.length == 0) {
          $(".codeErr").text('请输入公司代码！').show();
          $(".box").scrollTop($(".company-code").offset().top) //滚动条位置滚动到公司代码栏位置
        } else {
          $(".codeErr").hide();
        }
        if (this.jobId == 0) {
          this.jobId = ''
        }
        /*8.22版本修改以上*/
        if (this.sortshow == true && this.isnickname == true && this.isusername == true && this.fullname == true && this.code == true && this.emailshow == true && this.codeShow == true && this.comCode.length !== 0) {
          console.log('公司代码填写正确', '有公司代码一栏', this.realname, this.Oneid, this.sortonename, this.Twoid, this.sorttwoname, this.comCode, this.allname, this.nickname, this.emailAddress, this.jobId, this.jobname, this.fullAdress, this.pid, this.province, this.cid, this.selectcity, this.ccid, this.district)

          this.$http({
            method: "POST",
            url: this.$api.host + 'completePersonInfo',
            params: {
              userName: this.nickname,
              realName: this.realname,
              email: this.emailAddress,
              // position: this.jobname,
              position: this.jobId,
              companyName: this.allname,
              companyProvince: this.province,
              companyCity: this.selectcity,
              companyTown: this.district,
              companyStreet: this.fullAdress,
              provinceId: this.pid,
              cityId: this.cid,
              areaId: this.ccid,
//              companyTypeOne: this.sortonename,
//              companyTypeTwo: this.sorttwoname,
              companyTypeOne: this.Oneid,
              companyTypeTwo: this.Twoid,
              companyCode: this.comCode,
              fromUserId: this.fromUserIds
            }
          }).then((res) => {
            console.log(res);
            if (res.data.returnCode == 1) {
              if (this.comCode !== '' && this.realname !== '') {
                if (this.subText == true) {
                  window.sessionStorage.setItem("register", 2);
                  this.$router.push('/loadPass');
                } else {
                  window.sessionStorage.setItem("register", 0);
                  this.$router.push('/loadPass');
                }
              }
            } else if (res.data.returnCode == -1) {
              console.log(res.data.returnMsg)
              if (res.data.returnMsg == '用户名重复！') {
                this.nickname.length !== 0 ? $(".nickErr").text('用户名重复！').show() : $(".nickErr").text('请填写用户名！').show();
                $(".box").scrollTop(0)
              } else {
                console.log(res.data.returnMsg)
              }
            }
          }).catch((err) => {
            console.error(err)
            this.$toast({message: '服务器错误请稍后重试！', position: 'center', duration: 1500});
          })
        } else if (this.sortshow == true && this.isnickname == true && this.isusername == true && this.fullname == true && this.emailshow == true && this.codeShow == false) {
          console.log('无公司代码一栏', this.realname, this.Oneid, this.sortonename, this.Twoid, this.sorttwoname, this.comCode, this.allname, this.nickname, this.emailAddress, this.jobId, this.jobname, this.fullAdress, this.pid, this.province, this.cid, this.selectcity, this.ccid, this.district)

          this.$http({
            method: "POST",
            url: this.$api.host + 'completePersonInfo',
            params: {
              userName: this.nickname,
              realName: this.realname,
              email: this.emailAddress,
              // position: this.jobname,
              position: this.jobId,
              companyName: this.allname,
              companyProvince: this.province,
              companyCity: this.selectcity,
              companyTown: this.district,
              companyStreet: this.fullAdress,
              provinceId: this.pid,
              cityId: this.cid,
              areaId: this.ccid,
//              companyTypeOne: this.sortonename,
//              companyTypeTwo: this.sorttwoname,
              companyTypeOne: this.Oneid,
              companyTypeTwo: this.Twoid,
              companyCode: this.comCode,
              fromUserId: this.fromUserIds
            }
          }).then((res) => {
            console.log(res);
            if (res.data.returnCode == 1) {
              if (this.realname !== '') {
                if (this.subText == true) {
                  window.sessionStorage.setItem("register", 2);
                  this.$router.push('/loadPass');
                } else {
                  window.sessionStorage.setItem("register", 0);
                  this.$router.push('/loadPass');
                }
              }
            } else if (res.data.returnCode == -1) {
              console.log(res.data.returnMsg)
              if (res.data.returnMsg == '用户名重复！') {
                $(".nickErr").text('用户名重复！').show()
              } else {
                console.log(res.data.returnMsg)
              }
            }
          }).catch((err) => {
            console.error(err)
            this.$toast({message: '服务器错误请稍后重试！', position: 'center', duration: 1500});
          })

        }

      },
      // 获取公司选项
      getUserCompanyInfo() {
        this.$http.get(this.$api.host + 'getUserCompanyInfo')
          .then((res) => {
            if (res.data.returnCode == 1) {
              this.sortAll = res.data.returnObject
              this.sortOne = this.sortAll
              // this.Oneid = this.sortOne[0]['id']
              this.Oneid = ''
              for (var i = 0; i < this.sortOne.length; i++) {
                if (this.sortOne[i].name == this.sortonename) {
                  //console.log('我输出上市公司的ID是：'+this.sortOne[i].id)
                  this.Oneid = this.sortOne[i].id;
                  $("#company-1").find("option[value='" + this.Oneid + "']").attr("selected", true);
                  this.sortTwo = this.getCompanyInfoTwo(this.Oneid);
                  for (var j = 0; j < this.sortTwo.length; j++) {
                    if (this.sortTwo[j].name == this.sorttwoname) {
                      //console.log('我输出沪市主板的ID是：'+this.sortTwo[j].id)
                      this.Twoid = this.sortTwo[j].id;
                      $("#company-2").find("option[value='" + this.Twoid + "']").attr("selected", true);
                      // this.onechange(this.Twoid);
                      $(".sortErr").hide();
                    }
                  }
                }
              }

              // 设置默认值
              if (this.Oneid == '') {
                this.Oneid = this.sortOne[0].id
                this.sortonename = this.sortOne[0].name
                $("#company-1").find("option[value='" + this.Oneid + "']").attr("selected", true);
              }
              if (this.Twoid == '') {
                this.Twoid = this.sortOne[0].userCompanyInfoList[0].id
                this.sorttwoname = this.sortOne[0].userCompanyInfoList[0].name
                this.sortTwo = this.sortOne[0].userCompanyInfoList
                $("#company-2").find("option[value='" + this.Twoid + "']").attr("selected", true);
              }
              this.canInputCode()
              this.codeErrMsg = ''
            }
          })
          .catch((err) => {
            console.error(err.response)
          })
      },
      // 获取公司二级菜单
      getCompanyInfoTwo(id) {
        var userCompanyInfoList = []
        var sortOne = this.sortOne
        for (let i in sortOne) {
          if (sortOne[i].id == id) {
            userCompanyInfoList = sortOne[i].userCompanyInfoList
          }
        }
        if (userCompanyInfoList.length == 0) {
          userCompanyInfoList = sortOne[0].userCompanyInfoList
        }
        return userCompanyInfoList
      },
      // 获取职位信息
      getUserPosition() {
        this.$http.get(this.$api.host + 'getUserPosition')
          .then((res) => {
            if (res.data.returnCode == 1) {
              this.jobList = res.data.returnObject
              this.jobList.unshift({"id": "0", "name": "请选择"})
              this.jobId = this.getPositionIdByName(this.jobname)
              $("#getJob").find("option[value='" + this.jobId + "']").attr("selected", true);
            }
          })
          .catch((err) => {
            console.error(err.response)
          })
      },
      // 获取职位id
      getPositionIdByName(name) {
        var rtnName = ''
        var joblist = this.jobList
        for (let i in joblist) {
          if (joblist[i].name == name) {
            rtnName = joblist[i].id
          }
        }
        if (rtnName == '') {
          rtnName = joblist[0].id
        }
        return rtnName
      },
      canInputCode() {
        if ('上市公司,挂牌公司'.indexOf(this.sortonename) >= 0 && this.sorttwoname != '其他上市公司') {
          this.codeShow = true;
          /*this.code=false;
           $(".codeErr").hide();*/
        } else {
          this.codeShow = false;
          this.code = true;
        }
        this.codeIsErr()
        console.log('codeShow:' + this.codeShow + ' this.sortonename:' + this.sortonename + ' this.sorttwoname:' + this.sorttwoname)
      },
      setCodeTip(code, regx, num, isErr) {
        this.codePlaceholder = '请输入公司代码,如:' + code
        if (!isErr) {
          this.codeErrMsg = this.sorttwoname + '代码' + regx + '开头' + num + '位数字'
        }
      },
      codeIsErr() {
        let isErr = true
        if (this.codeShow) {
          if (this.sortonename == '上市公司') {
            if (this.sorttwoname == '沪市主板') {
              isErr = /^(600|601|603|900)[0-9]{3}$/.test(this.comCode)
              this.setCodeTip('600120', '600,601,603,900', '6', isErr)
            } else if (this.sorttwoname == '深市主板') {
              isErr = /^(000|001|200)[0-9]{3}$/.test(this.comCode)
              this.setCodeTip('000001', '000,001,200', '6', isErr)
            } else if (this.sorttwoname == '深市中小板') {
              isErr = /^(002)[0-9]{3}$/.test(this.comCode)
              this.setCodeTip('002001', '002', '6', isErr)
            } else if (this.sorttwoname == '深市创业板') {
              isErr = /^(300)[0-9]{3}$/.test(this.comCode)
              this.setCodeTip('300001', '300', '6', isErr)
            } else if (this.sorttwoname == '港股主板') {
              isErr = /^(00|01|02|03|04|06|80|84)[0-9]{3}$/.test(this.comCode)
              this.setCodeTip('00001', '00,01,02,03,04,06,80,84', '5', isErr)
            } else if (this.sorttwoname == '港股创业板') {
              isErr = /^(08)[0-9]{3}$/.test(this.comCode)
              this.setCodeTip('08030', '08', '5', isErr)
            }
          } else if (this.sortonename == '挂牌公司') {
            if ('创新层,基础层'.indexOf(this.sorttwoname) >= 0) {
              isErr = /^(43|83|87)[0-9]{4}$/.test(this.comCode)
              this.setCodeTip('430002', '43,83,87', '6', isErr)
            } else if (this.sorttwoname == '两网及退市公司') {
              isErr = /^(40|42)[0-9]{4}$/.test(this.comCode)
              this.setCodeTip('400002', '40,42', '6', isErr)
            }
          }
        }
        console.log(isErr)
        if (!isErr) {
          this.code = false
          $(".codeErr").show();
          // this.allname = ''
        } else {
          this.code = true
          $(".codeErr").hide();
        }
      }
    },

    destroyed: function () {
      window.localStorage.removeItem("fromUserId");
    }
  }

</script>

<style scoped>
  #contrev-info {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  #contrev-info b {
    width: 15px;
    height: 15px;
    color: #fff;
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 50%;
    background-image: url("/static/img/personal/close.png");
    background-size: contain;
    display: none;
  }
  #contrev-info .box {
    width: 100%;
    height: 90%;
    float: none;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  #contrev-info .baseinfo, #contrev-info .company, #contrev-info .address {
    width: 100%;
    font-size: 0;
    height: auto;
    background: #fff;
    padding: 15px 12px 15px 12px;
    box-sizing: border-box;
    display: inline-block;
  }
  #contrev-info .nickname, #contrev-info .username, #contrev-info .email, #contrev-info .company-sort, #contrev-info .company-all, #contrev-info .position, #contrev-info .company-address, #contrev-info .company-code {
    width: 100%;
    height: 40px;
    display: inline-block;
    margin-bottom: 10px;
    position: relative;
  }
  #contrev-info .email {
    margin-bottom: 0;
  }
  #contrev-info .nickname span, #contrev-info .username span, #contrev-info .email span, #contrev-info .company-sort span, #contrev-info .company-all span, #contrev-info .position span, #contrev-info .company-address span, #contrev-info .company-code span {
    width: 25%;
    height: 40px;
    display: inline-block;
    text-align: right;
    line-height: 40px;
    padding-right: 5px;
    box-sizing: border-box;
    letter-spacing: 1px;
    font-size: 15px;
    color: #535353;
  }
  .nickname input, .username input, .email input, .company-all input, .position input, .company-address input, .company-code input {
    display: inline-block;
    width: 75%;
    height: 40px;
    outline: none;
    font-size: 15px;
    padding: 10px 5px;
    box-sizing: border-box;
    color: #8d8d8d;
    font-family: PingFangSC-Light, sans-serif;
    border: 1px solid #e3e3e3;
    border-radius: 2px;
  }
  #contrev-info .username i, #contrev-info .company-all i, #contrev-info .company-sort i, #contrev-info .company-code i {
    width: auto;
    height: 100%;
    color: #ffb148;
    font-style: normal;
  }
  #contrev-info hr {
    width: 100%;
    height: 7.5px;
    background: #f0f1f5;
    border: 0;
    margin: 0;
  }
  #contrev-info .userErr, .emailErr, .fullErr, .codeErr, .sortErr, .nickErr {
    width: 100%;
    height: auto;
    padding-left: 25%;
    box-sizing: border-box;
    font-size: 13px;
    color: #fb4319;
    margin: -5px 0 5px 0;
  }
  #contrev-info .sortErr {
    display: none;
  }
  #contrev-info .fullErr {
    margin: -5px 0 -10px 0;
  }
  #contrev-info .emailErr {
    margin: 0px 0 -10px 0;
  }
  #contrev-info .sortbox {
    display: inline-block;
    width: 75%;
    height: 40px;
    outline: none;
    padding: 5px 5px;
    box-sizing: border-box;
    color: #8d8d8d;
    font-family: PingFangSC-Light, sans-serif;
    border: 1px solid #e3e3e3;
    border-radius: 2px;
  }
  #contrev-info #company-1, #contrev-info #company-2 {
    width: 55%;
    height: 100%;
    border: 0;
    text-align: left;
    outline: none;
    color: #8d8d8d;
  }
  #contrev-info #company-2 {
    width: 45%;
    padding-left: 5px;
    box-sizing: border-box;
  }
  #contrev-info #company-2 option {
    text-align: center;
  }
  #contrev-info .sortbox, #contrev-info .jobsort, .areabox {
    display: inline-block;
    width: 75%;
    height: 40px;
    outline: none;
    padding: 5px 5px;
    box-sizing: border-box;
    color: #8d8d8d;
    font-family: PingFangSC-Light, sans-serif;
    border: 1px solid #e3e3e3;
    border-radius: 2px;
  }
  #contrev-info .jobsort {
    font-size: 15px;
  }
  #contrev-info .areabox {
    display: inline-block;
  }
  #contrev-info .areabox select {
    width: 33.33333%;
    height: 100%;
    box-sizing: border-box;
    border: 0;
  }
  #contrev-info .jobsort select {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    color: #8d8d8d;
    font-size: 15px;
    font-family: PingFangSC-Light, sans-serif;
  }
  #contrev-info .jobtext { /*ios显示出来 使用覆盖div层完成*/
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%; /*padding: 5px 5px;*/
    padding: 0 5px;
    box-sizing: border-box;
    color: #323232;
    font-family: PingFangSC-Light, sans-serif;
    background: white;
    line-height: 40px;
  }
  #contrev-info .textarea {
    font-family: PingFangSC-Light, sans-serif;
    display: block;
    color: #323232 !important;
    font-size: 15px;
    width: 75%;
    height: 67px;
    border-radius: 2px;
    float: right;
    resize: none;
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
    padding: 5px 4px;
    -webkit-appearance: none;
  }
  #contrev-info #fullname {
    box-sizing: border-box;
    padding-right: 10%;
  }
  #contrev-info input {
    font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    outline: none !important;
    font-size: 15px !important;
    color: #323232 !important;
    -webkit-appearance: none;
  }
  #contrev-info select {
    font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    outline: none;
    font-size: 15px;
    color: #323232;
    border: 0;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: url("/static/img/personal/toTDSelect.png") no-repeat right center;
    background-size: 18px;
    padding-right: 14px;
    border-radius: 0;
  }
  .complete {
    width: 100%;
    height: 50px;
    background-color: #ffd59c;
    line-height: 50px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 18px;
    color: #fff;
    font-family: PingFangSC-Medium, sans-serif;
  }
  .complete button {
    border: none;
    border-radius: 0;
    font-size: 15px;
    background-color: #ffb148;
    color: white;
  }
  .pass {
    background: #ffb148;
  }
</style>
<style>
  .complete {
    width: 100%;
    height: 50px;
    background: #ffd59c;
    line-height: 50px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 18px;
    color: #fff;
    font-family: PingFangSC-Medium, sans-serif;
  }
  .complete button {
    border: none;
    border-radius: 0;
    font-size: 15px;
    background-color: #ffb148;
    color: white;
  }
  .pass {
    background: #ffb148;
  }
</style>
