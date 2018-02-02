<!--<template>
    <div class="innerCustomerGSelect">
      <label class="labelUnit" for="selects">单位:</label>
      <select id="selects" class="selectsShow" v-model="selected"
              @change='changeType($event)'>
        <option :value="list.id" v-for="(list,index) in allUnitItem">{{list.name}}
        </option>
      </select>
    </div>
</template>
<script>
  export default {
    name:"unitSelect",
    data(){
        return {
          selected:"",
          allUnitItem:[]
        }
    },
    props:[],
    methods:{
      changeType(){
          this.$emit()
      }
    }
  }
</script>
<style scoped >
  #internalTables{
    width: 100%;
    height: 100%;
  }
  #internalTables .innerCustomerGSelect{
  }
  .innerCustomerGSelect .labelUnit{
    vertical-align: bottom;font-size: 15px;
  }
  .selectsShow{
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYyNUE3MThEODcxMDExRTc4RTZFRDcwQzI4NDY2MTlEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYyNUE3MThFODcxMDExRTc4RTZFRDcwQzI4NDY2MTlEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjI1QTcxOEI4NzEwMTFFNzhFNkVENzBDMjg0NjYxOUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjI1QTcxOEM4NzEwMTFFNzhFNkVENzBDMjg0NjYxOUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz52nVdgAAADpElEQVR42uSZS0iUURTHz4xWYz4CKQh825iRhpkRtLLpQbqLIFrUpqjsQRZBUe2aVdkutBf0IIoeBNUiggjNWgSFWZGVr2oU6eGitEzHMb/+t+98zTDM4NzvuzqfdOCPw3gfP87ce+459zo0TSOLNh9aDpVB86AsKAWaAfVBP6Fu6B3UBNVDb6xM6DAJnQtthjZA+Sb6v4euQOehj9K9BbSE3NAlKKCpsQCP55bhiLWhCzoCDWnjY2JcL8+jBLoAatYmxpp5PkvQq6E+bWJNzFdhFnod5NfiY36ePyJbtOghQtg9aCrFz4ahSg6RY4a8AugZx9l4m4jzS6C20C+dYY1c0HWbABNzXGOuqNCHoFKylwmew9GWhxt6DU0j+5kfKoY6wj3ttSkwMZc33NNzoFYogexro9BcqNPw9BabAxurYmuop0WmlUP2ty7BKeiLpIC/tarF+N5ONPg11tbZgldAL4t5gnaEzMd7kcofUwPcjx/4UTXRg00yvTwCerFEzaD/6XlI9PaiNeBfn4kad/GRli7Ts0xAF8bcvGA9uhxkr+PgbDlrDlgsh4YdyNYQENJQBK24INO70Cm9ATPKiRYd0D933kK1d07eww3biX4P4ZBGpC2vRVxIlBkh28lFqJxleohKqvXPHTdxjp6JEfgLcrYqopFBotRcHdghHWlTRcgzX477kL2+PKF/zl+Dg7YqetuBHqzh3Tpwcga2P4ATXKYDdr9p6BykuyV7uL6+DY+fjgL8CUtipw48fTaAT5oGhv1w8r2EecupwBrfz+B3gp7/N0U3gLfhEEZOn5qF8gKbN8FSbfEX2mc53mai0CndF1wyr2qDUaIRHh4dATD2e3kdftspVmfzJXKitNQyeNYqbCoM97wGScFdgAaIept14BR42HMqGOetWauTr6rUmIgqRjjsug9P9yIO52EN16kCFtYkokcRJ//qrKcRQx8lSppFtBInp8OpcvRiI8vzcTKiFjwd/kiaqTrLyzVccFV5EilOTrXABqcWWrm0RSh0bV25dPLVgZ3tBnNOqmp8gcgtw6txUZ7X2NTLxw3gSNdiIiF4Ai20EfALPvyGokETL/anNInu8ogbrCX91jKeNswcbZFS00gmrlc3xhF8mOevj/jfMV4CKuLwEtAPVf53by6hr1vecXzd8qt+3bLdO6LVF1uxWfJM9P8AXSaTL7YOzfrbuMjHPRR8Gxf3KMlQGhfNA5z6Gm/jDVCLlQn/CDAABzSX6OUW+PUAAAAASUVORK5CYII=");
    background-size: 15px;
    background-repeat: no-repeat;
    background-position: right center;
  }
  #internalTables .innerCustomerGSelect #selects{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    display: inline-block;
    border: 0;
    outline: none;
    font-size: 15px;
    color: white;
    font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    padding: 0 20px 0 0;
    margin-top: 0;
    background-color: rgba(255, 170, 72, 0);
    position: relative;
    top: -1px;
  }
  #internalTables .innerCustomerGSelect select option{
    color: #323232;
  }
</style>-->

<template>
  <div class="innerCustomerGSelect">
    <label class="labelUnit" for="selects">单位:</label>
    <select id="selects" class="selectsShow" v-model="selected"
            @change='changeType(selected)'>
      <option :value="list.id" v-for="(list,index) in listArr">{{list.name}}
      </option>
    </select>
  </div>
  <!--<ul class="select-box">
    <li class="select-box-title"  v-for="(v,i) in selectData" :key="i" @click="clickFn(i)">
      {{ v.title }}
      <div class="select-box-content" v-show="v.show">
        <div class="opton" v-for="(val,key) in v.options" :key="key">
          {{ val }}
        </div>
      </div>
    </li>
  </ul>-->
   <ul class="select-box">
     <li class="select-box-title" v-for="(v,i) in selectData" :key="i" @click="clickFn(i)">
       {{ v.title }}
       <div class="select-box-content" v-show="v.show">
         <div class="option" v-for="(val,key) in v.options" :key="key">
           {{ val }}
         </div>
       </div>
     </li>
   </ul>
</template>

<script>
  export default {
    name:"select",
    data(){
      return{
          selected:""
      }
    },
    props: ['listArr'],
    methods: {
      changeType(i){
        this.$emit('changeType', i);
        console.log("456",i)
      }
    }
  }
</script>
<style scoped >
  #internalTables{
    width: 100%;
    height: 100%;
  }
  #internalTables .innerCustomerGSelect{
  }
  .innerCustomerGSelect .labelUnit{
    vertical-align: bottom;font-size: 15px;
  }
  .selectsShow{
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYyNUE3MThEODcxMDExRTc4RTZFRDcwQzI4NDY2MTlEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYyNUE3MThFODcxMDExRTc4RTZFRDcwQzI4NDY2MTlEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjI1QTcxOEI4NzEwMTFFNzhFNkVENzBDMjg0NjYxOUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjI1QTcxOEM4NzEwMTFFNzhFNkVENzBDMjg0NjYxOUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz52nVdgAAADpElEQVR42uSZS0iUURTHz4xWYz4CKQh825iRhpkRtLLpQbqLIFrUpqjsQRZBUe2aVdkutBf0IIoeBNUiggjNWgSFWZGVr2oU6eGitEzHMb/+t+98zTDM4NzvuzqfdOCPw3gfP87ce+459zo0TSOLNh9aDpVB86AsKAWaAfVBP6Fu6B3UBNVDb6xM6DAJnQtthjZA+Sb6v4euQOehj9K9BbSE3NAlKKCpsQCP55bhiLWhCzoCDWnjY2JcL8+jBLoAatYmxpp5PkvQq6E+bWJNzFdhFnod5NfiY36ePyJbtOghQtg9aCrFz4ahSg6RY4a8AugZx9l4m4jzS6C20C+dYY1c0HWbABNzXGOuqNCHoFKylwmew9GWhxt6DU0j+5kfKoY6wj3ttSkwMZc33NNzoFYogexro9BcqNPw9BabAxurYmuop0WmlUP2ty7BKeiLpIC/tarF+N5ONPg11tbZgldAL4t5gnaEzMd7kcofUwPcjx/4UTXRg00yvTwCerFEzaD/6XlI9PaiNeBfn4kad/GRli7Ts0xAF8bcvGA9uhxkr+PgbDlrDlgsh4YdyNYQENJQBK24INO70Cm9ATPKiRYd0D933kK1d07eww3biX4P4ZBGpC2vRVxIlBkh28lFqJxleohKqvXPHTdxjp6JEfgLcrYqopFBotRcHdghHWlTRcgzX477kL2+PKF/zl+Dg7YqetuBHqzh3Tpwcga2P4ATXKYDdr9p6BykuyV7uL6+DY+fjgL8CUtipw48fTaAT5oGhv1w8r2EecupwBrfz+B3gp7/N0U3gLfhEEZOn5qF8gKbN8FSbfEX2mc53mai0CndF1wyr2qDUaIRHh4dATD2e3kdftspVmfzJXKitNQyeNYqbCoM97wGScFdgAaIept14BR42HMqGOetWauTr6rUmIgqRjjsug9P9yIO52EN16kCFtYkokcRJ//qrKcRQx8lSppFtBInp8OpcvRiI8vzcTKiFjwd/kiaqTrLyzVccFV5EilOTrXABqcWWrm0RSh0bV25dPLVgZ3tBnNOqmp8gcgtw6txUZ7X2NTLxw3gSNdiIiF4Ai20EfALPvyGokETL/anNInu8ogbrCX91jKeNswcbZFS00gmrlc3xhF8mOevj/jfMV4CKuLwEtAPVf53by6hr1vecXzd8qt+3bLdO6LVF1uxWfJM9P8AXSaTL7YOzfrbuMjHPRR8Gxf3KMlQGhfNA5z6Gm/jDVCLlQn/CDAABzSX6OUW+PUAAAAASUVORK5CYII=");
    background-size: 15px;
    background-repeat: no-repeat;
    background-position: right center;
  }
  #internalTables .innerCustomerGSelect #selects{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    display: inline-block;
    border: 0;
    outline: none;
    font-size: 15px;
    color: white;
    font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    padding: 0 20px 0 0;
    margin-top: 0;
    background-color: rgba(255, 170, 72, 0);
    position: relative;
    top: -1px;
  }
  #internalTables .innerCustomerGSelect select option{
    color: #323232;
  }
</style>


