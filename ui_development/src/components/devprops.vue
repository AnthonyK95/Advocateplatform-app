<template>
    <div class="container">
       <!-- <div slot="deleteDevice" class="deleteDevice">Delete</div> -->
        <!-- Header Section for the information -->
        <section class="header">
            <ul>
                <li>Device</li>
                <li>127.0.0.1</li>
            </ul>
        </section>
        <div class="center-card">
            <ul>
                <li><h1>Active Contract &nbsp;&nbsp;{{activeContract}}</h1></li>
                <li><button @click="modify('contract')">Modify</button></li>
                
            </ul>
            
        </div><hr>
        <div class="main-elements">
            <ul>
                <li v-for="props in deviceprops" :key="props._id">
                    <h2>{{props.deviceName}}</h2>
                </li>
            </ul>
        </div>
    </div>
</template>



<style scoped>
.container{
    width: 100%;
    margin:auto;
    background-color: white;
}
.header{
    width: 100%;
    margin:auto;
    height: 10vh;
}
.header ul{list-style: none;}
.header ul li{
    display: inline;
    position: relative;
    left: 2em;  
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
    left:2.5em;
}
.center-card ul{list-style:none;}
.center-card ul li{display: inline-block;}
.center-card h1{
    position: relative;
    left:0.5em;
    font-weight: normal;
}
.center-card button{
    width: 100px;
    height: 34px;
    position: relative;
    left: 2.0em;
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
    height: 40vh;
}
.main-elements ul{list-style:none;}
.main-elements ul li{
    display: block;
    position: relative;
    left: 2.5em;
    top: 1em;
    width: 85%;
    height: 47px;
    background-color: #f2f2f2;
    border-radius: 5px;
    right: 2em;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.07);
    cursor: pointer;
}
.main-elements ul li h2{
    padding-top: 0.4em;
    padding-left: 1em;
    color: grey;
    position: relative;
}

</style>


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
            activeContract:'1d67dsa5f67as'
        }
    },
    methods:{
        modify:function(contractID){
            console.log(contractID);
        },
        deleteDev:function(){
            let deviceID = this.properties;
            axios.post('http://46.103.120.51:8080/api/dashboard/devices/delete',{deviceID},localStorage.getItem('token'))
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
            axios.post('http://46.103.120.51:8080/api/device/properties',{deviceID},localStorage.getItem('token'))
            .then(response => {
                this.deviceprops = response.data;
                this.deviceVendor = response.data.properties.deviceVendor;
            })
            .catch(error => {
                console.log(error);
           })
        },
    },
    created(){
        this.requireContracts();
    }
}
</script>
