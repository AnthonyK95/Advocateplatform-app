<template>
    <div class="container">
       <!-- <div slot="deleteDevice" class="deleteDevice">Delete</div> -->
        <!-- Header Section for the information -->
        <section class="header">
            <ul>
                <li>Device</li>
                <li>127.0.0.1</li>
                <li><button class="delete" @click="deleteDev()">Delete</button></li>
            </ul>
        </section>
        <div class="center-card">
            <ul>
                <li><h1>Active Contract &nbsp;&nbsp;{{activeContract}}</h1></li>
                <li><button @click="modify('contract')">Modify</button></li>
                <li><button @click="withdrawDev()" class="withdraw" style="color:white;">Withdraw</button></li>
            </ul>
        </div><hr>
        <div class="main-elements">
            <ul>
                <li class="makeChange" v-for="contract in contractHistory" :key="contract._id">
                    <h2>{{contract.deviceID}}</h2>
                </li>
            </ul>
        </div>
        
    </div>
</template>


<script>
import axios from 'axios';

export default {
    props:['properties'],
    data(){
        return{
            deviceprops:'',
            deleteDevice:true,
            ip:'127.0.0.1',
            deviceVendor:'',
            activeContract:'',
            contractHistory:''
        }
    },
    methods:{
        withdrawDev:function(){
            let deviceID = this.properties;
            axios.post('http://localhost:3001/api/dashboard/devices/withdraw',{deviceID},localStorage.getItem('token'))
           .then(response => {
               if(response.data.message == 'Success'){
                   console.log("Withdraw Complete");
                   location.reload();
               }
            })
            .catch(error => {
                console.log(error);
            })
        },
        contractHistorys:function(){
              let deviceID = this.properties;
              axios.post('http://localhost:3001/api/dashboard/devices/contractHistory',{deviceID},localStorage.getItem('token'))
              .then(response=>{
                this.contractHistory = response.data.history;
                console.log(response.data.history);
                console.log("Contract History Loaded");
              })
              .catch(err=>{
                  console.log(err);
              })
        },
        deleteDev:function(){
            let deviceID = this.properties;
            axios.post('http://localhost:3001/api/dashboard/devices/delete',{deviceID},localStorage.getItem('token'))
            .then(response => {
               if(response.data.message == 'success'){
                   location.reload();
               }
            })
            .catch(error => {
                console.log(error);
            })
        },
        requireContracts:function(){
            let deviceID = this.properties;
            axios.post('http://localhost:3001/api/device/properties',{deviceID},localStorage.getItem('token'))
            .then(response => {
                this.deviceprops = response.data;
                this.deviceVendor = response.data.properties.deviceVendor;
                this.activeContract = response.data.properties.activeContract;
            })
            .catch(error => {
                console.log(error);
           })
        },
    },
    created(){
        this.requireContracts();
        this.contractHistorys();
    }
}
</script>


<style scoped>
.makeChange{
    margin-top: 15px;
}


.container{
    width: 100%;
    margin:auto;
    background-color: white;
    overflow-x: hidden;
}
.header{
    width: 100%;
    margin:auto;
    height: 10vh;
    text-align: center;
}
.header ul{list-style: none;}
.header ul li{
    text-align: center;
    display: inline;
    position: relative;
    top: 0.2em;
    margin:10px;
    font-size: 20px;
    font-family: 'Source Sans Pro', sans-serif;
    color:grey;
}
.center-card{
    display: inline-table;
    width: 100%;
    float: right;
    position: relative;
    left: 2.6em;
    color: grey;
    left: 2em;
    font-family: 'Source Sans Pro', sans-serif;
}
hr{
    position: relative;
    top:2.5em;
    width: 85%;
    border-color: black;
    left:1.5em;
}
.center-card ul{list-style:none;}
.center-card ul li{display: inline-block;}
.center-card h1{
    position: relative;
    font-weight: normal;
}
.center-card button{
    width: 100px;
    height: 40px;
    position: relative;
    top:1.5em;
    border:none;
    color: grey;
    border-radius: 5px;
    outline:none;
    cursor: pointer;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.10);
}

.main-elements{
    position: relative;
    top: 5em;
    width: 100%;
    height: 40vh;
}

.main-elements ul{list-style:none;}
.main-elements ul li{
    display: block;
    position: relative;
    left: 7.5%;
    top: 1em;
    width: 85%;
    height: 50px;
    background-color: #f2f2f2;
    border-radius: 5px;
    right: 2em;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
    cursor: pointer;
}
.main-elements ul li h2{
    padding-top: 1em;
    padding-left: 1em;
    font-size: 15px;
    color: grey;
    position: relative;
}

.delete{
    float: right;
    width: 100px;
    height: 35px;
    cursor: pointer;
    background-color: red;
    color: white;
    border:none;
    right: 3em;
    position: relative;
    border-radius: 5px;
    box-shadow: 0px 8px 16px 0 rgb(0, 0, 0,0.25);
    margin:auto;
}


.withdraw{
    background-color: red;
    color: white;
}


@media only screen and (min-width: 1200px) {


.container{
    width: 100%;
    margin:auto;
    background-color: white;
    overflow-x: hidden;
}
.header{
    width: 100%;
    margin:auto;
    height: 10vh;
    text-align: left;
}
.header ul{list-style: none;}
.header ul li{
    display: inline;
    position: relative;
    left: 3em;  
    top: 1.2em;
    margin:10px;
    margin-left: 5px;
    font-size: 20px;
    font-family: 'Source Sans Pro', sans-serif;
    color:grey;
}
.center-card{
    display: inline-table;
    width: 100%;
    float: right;
    position: relative;
    left: 2.6em;
    color: grey;
    left: 2em;
    font-family: 'Source Sans Pro', sans-serif;
}
hr{
    position: relative;
    top: 1.5em;
    width: 85%;
    border-color: black;
    left:3.5em;
}
.center-card ul{list-style:none;}
.center-card ul li{display: inline-block;}
.center-card h1{
    position: relative;
    left:1em;
    font-weight: normal;
}
.center-card button{
    width: 100px;
    height: 34px;
    position: relative;
    left: 40%;
    top:-0.3em;
    border:none;
    color: grey;
    border-radius: 5px;
    outline:none;
    cursor: pointer;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.10);
}
.main-elements{
    position: relative;
    top: 3em;
    width: 100%;
}
.main-elements ul{list-style:none;}
.main-elements ul li{
    display: block;
    position: relative;
    left: 3.5em;
    top: 1em;
    width: 85%;
    height: 50px;
    background-color: #f3f3f3;
    border-radius: 5px;
    right: 2em;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.15);
    cursor: pointer;
}
.main-elements ul li h2{
    padding-top:0.8em;
    padding-left: 1em;
    color: grey;
    font-size: 18px;
    position: relative;
}

.delete{
    float: right;
    width: 100px;
    height: 35px;
    cursor: pointer;
    background-color: red;
    color: white;
    border:none;
    right: 7em;
    position: relative;
    border-radius: 5px;
    box-shadow: 0px 8px 16px 0 rgb(0, 0, 0,0.25);
    margin:auto;
}

.withdraw{
    width: 100px;
    height: 35px;
    cursor: pointer;
    background-color: red;
    color: white;
    border:none;
    right: 3em;
    position: relative;
    border-radius: 5px;
    box-shadow: 0px 8px 16px 0 rgb(0, 0, 0,0.25);
    margin:auto;
   
}

}

</style>

