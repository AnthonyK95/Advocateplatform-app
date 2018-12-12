<template>
   <div class="container">
      <h1 class="header">Welcome Vendor</h1>
       <h3 style="color: lightgrey;">Small Notice : For testing purposes</h3>
       <h4 style="color:lightgrey">Vendor 1: Code 123</h4>
     <!--Form to send the data code of the vendor-->
      <div id="form">
        <form @submit.prevent="requestingMyDevices">
          <input type="text" name="code" v-model="data.code" autocomplete="off" placeholder="Vendors ID">
        </form>
      </div>
      <div class="answer">
        <h2 v-if="answer === true">Contract Has been send to your devices</h2>
        <h2 v-else-if="answer === false">The Code does not exist</h2>
      </div>
      <div class="listDevices">
       <ul v-if="devicess === true">
         <li :key="item._id" v-for="item in items.data" @click="createContract(item._id)">
           <h1>{{item.deviceName}}</h1>
           <h3>{{item.deviceType}}</h3>
         </li>
       </ul>
     </div>
   </div>
</template>



<script>
  //Imported Components for use
  import axios from 'axios'

export default {
  data(){
    return{
      data:{code:''},
      answer:'',
      items:'',
      devicess:''
    }
  },
  methods:{
    createContract:function(variable){
      this.answer = true;
      axios.post('http://localhost:3001/api/company/requestContract',{variable})
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
    },
    requestingMyDevices:function(){
      let code  = this.data.code;
      if(code === "123"){
        let postCodeRequest = true;
        axios.post('http://localhost:3001/api/company/contractCreation',{postCodeRequest})
          .then(response => {
            this.devicess = true;
            this.answer = '';
            this.items= response.data;
          })
          .catch(error => {
            console.log(error);
          })
      }
      else{
        this.answer = false;
        this.devicess = false;
      }
    }
  },
}
</script>




<style scoped>
  .container{
    width: 80%;
    margin:auto;
  }
  .header{
    margin-top: 70px;
    text-align:center;
  }
  #form{
    text-align: center;
    margin-top: 120px;
  }
  #form input[type= 'text']{
    width: 300px;
    height: 25px;
    padding:10px;
    text-align:center;
    border:1px solid lightgrey;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
    outline:none;
  }
  .answer{
    text-align:center;
    margin-top: 30px;
  }
  .listDevices{
    width: 100%;
  }
  .listDevices ul{
    margin-top: 100px;
    list-style:none;
  }
  .listDevices ul li{
    display:inline-block;
    text-align: center;
    font-size: 15px;
    margin-top:50px;
    margin-left:50px;
    cursor: pointer;
  }
</style>

