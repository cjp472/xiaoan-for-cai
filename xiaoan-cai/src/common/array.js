////////////
//数据处理==>"数组"
//
export default {
    ////数组去重
    unique: function (arr) {
        var result = [];
        var obj = {};
        for (let i = 0; i < arr.length; i++) {
            if (!obj.hasOwnProperty(arr[i])) {
                result.push(arr[i]);
                obj[arr[i]] = 0;
            }
        }
        return result
    },
    //去除空数组
    ImpArr: function (array) {
        var arr = array;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "" || typeof(arr[i]) === "undefined") {
                arr.splice(i, 1);
                i = i - 1;
            }
        }
        return arr
    },
    //删除array指定下标下的元素
    closeArr(array, index) {
        if (isNaN(index) || index >= array.length) {
            return false;
        }
        for (let i = 0, n = 0; i < array.length; i++) {
            if (array[i] !== array[index]) {
                array[n++] = array[i];//
            }
        }
        array.length -= 1;

        return array;
    },
    //删除左右两端的空格
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    //删除左边的空格
    ltrim: function (str) {
        return str.replace(/(^\s*)/g, "");
    },
    //删除右边的空格
    rtrim: function (str) {
        return str.replace(/(\s*$)/g, "");
    },
    //处理获取到的数据 实现上拉加载
    loadMore: function (arr, contents) {
        let array = arr, content = contents;

        /**
         * 判断一个对象是否是数组，参数不是对象或者不是数组，返回false
         * @param {Object} arg 需要测试是否为数组的对象
         * @return {Boolean} 传入参数是数组返回true，否则返回false
         * contentsw为获取到的数据
         * arr为原数据
         */
        function isArray(arg) {
            if (typeof arg === 'object') {
                return Object.prototype.toString.call(arg) == '[object Array]';
            }
            return false;
        }

        if (isArray(array) && isArray(content)) {
            if (array.length > 0 && content !== null) {
                for (let i in content) {
                    array.push(content[i]);
                }
            } else if (array.length === 0 && content !== null) {
                array = content;
            } else {
                array = [];
            }
        }
        //控制下拉刷新
        return (array)
    },
    //根据总条数 判断有多少页
    totalPage: function (arr, content) {
        let array = arr, number = content, page = '';
        array = Number(array);
        number = Number(number);
        page = Number(page);
        if (array % number > 0) {
            page = (array / number) + 1;
        } else {
            page = array / number;
        }
        return parseInt(page)
    },
    ///
    //高亮显示
    key(value, str) {
        let star = [];
        star = value.split(" ");
        for (let i = 0; i < star.length; i++) {
            if (star[i] == "" || typeof(star[i]) == "undefined" || star[i] == 0 || star[i] == 1
                || star[i] == 2 || star[i] == 3 || star[i] == 4 || star[i] == 5 || star[i] == 6 || star[i] == 7 || star[i] == 8 || star[i] == 9) {
                star.splice(i, 1);
                i = i - 1;
            }
        }
        /*console.log("432453", star);*/
        for (let i = 0; i < star.length; i++) {
            let fen = str.split(star[i]);
            str = fen.join('<span style="color:#ffc051;">' + star[i] + '</span>');
        }
        return str;
    },
    // toThousands(num) {
    //     return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    // },

    //主调了函数
    formatFloat(f, size) {
        var tf = this.formatfloat1(f, size);
        var sf = "" + tf;
        //alert(tf);
        return this.formatfloat2(sf, size);
    },

    //对浮点数格式化，防止出现0.99999998的现象(f为浮点数，size中保留小数位数)
    formatfloat1(f, size) {
        var tf = f * Math.pow(10, size);
        tf = Math.round(tf + 0.000000001);
        tf = tf / Math.pow(10, size);
        return tf;
    },

    //格式化浮点数字符串，保证其有给定的小数位数。其中f是浮点数的字符串常量，size是保留小数位数
    formatfloat2(f, size) {
        let aa = f.split("");
        var varchar = "";
        var num = 0, k = 0; //num是已得小数点位数，K用来作是否到小数点控制
        for (var i = 0; i < aa.length; i++) {
            varchar += aa[i];
            if (aa[i] == ".") {
                k = 1;
            }
            if (k == 1) {
                num++;
                if (num > size) break;
            }
        }
        num--;
        for (; num < size; num++) {
            //如果位数不够，则补0
            varchar += "0";
        }
        return varchar;
    },
    /*数字千分符*/
    rendererZhMoney(v) {
        if (isNaN(v)) {
            return v;
        }
        v = (Math.round((v - 0) * 100)) / 100;
        v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v
            + "0" : v);
        v = String(v);
        var ps = v.split('.');
        var whole = ps[0];
        var sub = ps[1] ? '.' + ps[1] : '.00';
        var r = /(\d+)(\d{3})/;
        while (r.test(whole)) {
            whole = whole.replace(r, '$1' + ',' + '$2');
        }
        v = whole + sub;

        return v;
    },
    // *转为以万为单位*/
    rendererZhMoneyWan(v) {
        if (isNaN(v)) {
            return v;
        }
        v = v * 0.0001; // 10000;
        v = this.formatFloat(v, 2);// parseInt(v);
        this.rendererZhMoney(v);
        return (parseFloat(v));
    },
    rendererZhMoneyYi(v) {
        if (isNaN(v)) {
            return v;
        }
        v = v * 0.00000001; // 10000;
        v = this.formatFloat(v, 2); // parseInt(v);
        this.rendererZhMoney(v);
        return (parseFloat(v));
    },
    // 小数点后保留两位 没有两位填0
    toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },
    /* 自适应 */
    unitWan(str) {
        if (str == undefined || str == null) {
            return ''
        }
        str = this.toDecimal2(str.toString());
       // console.log(str.length, this.toDecimal2(str));
        if (str.length < 8 || isNaN(str)) {
            return ([str]);
        } else if (str.length <= 11 && str.length >= 5 && !isNaN(str)) {
            //console.log(1);
            var x = (str / 10000).toFixed(2);
            var y = x.toString().split('.')
            if (y[0].length > 3) {
                var z = y[0].substring(0, y[0].length - 3);
                var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
                y[0] = n;
            }
            //   console.log([y.join("."), '万']);
            return ([y.join("."), '万']);
        } else if (str.length > 11 && !isNaN(str)) {
            //console.log(2);
            var x = (str / 100000000).toFixed(2);
            var y = x.toString().split('.')
            if (y[0].length > 3) {
                var z = y[0].substring(0, y[0].length - 3);
                var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
                y[0] = n;
            }
            // console.log([y.join("."), '亿']);
            return ([y.join("."), '亿']);
        } else{

        }
    },
    unitQianYi(str) {
        if (str == undefined || str == null) {
            return ''
        }
        str = this.toDecimal2(str.toString());
       // console.log(str.length, this.toDecimal2(str));
        if (str.length < 8 || isNaN(str)) {
            return ([str]);
        } else if (str.length <= 11 && str.length >= 5 && !isNaN(str)) {
            //console.log(1);
            var x = (str / 10000).toFixed(2);
            var y = x.toString().split('.')
            if (y[0].length > 3) {
                var z = y[0].substring(0, y[0].length - 3);
                var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
                y[0] = n;
            }
            //   console.log([y.join("."), '万']);
            return ([y.join("."), '万']);
        } else if (str.length > 11 && str.length < 15 && !isNaN(str)) {
            //console.log(2);
            var x = (str / 100000000).toFixed(2);
            var y = x.toString().split('.')
            if (y[0].length > 3) {
                var z = y[0].substring(0, y[0].length - 3);
                var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
                y[0] = n;
            }
            // console.log([y.join("."), '亿']);
            return ([y.join("."), '亿']);
        } else if (str.length >= 15 && !isNaN(str)) {
            //console.log(4);
            var x = (str / 100000000000).toFixed(2);
            var y = x.toString().split('.')
            if (y[0].length > 3) {
                var z = y[0].substring(0, y[0].length - 3);
                var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
                y[0] = n;
            }
            // console.log([y.join("."), '亿']);
            return ([y.join("."), '千亿']);
        }
    },

}
