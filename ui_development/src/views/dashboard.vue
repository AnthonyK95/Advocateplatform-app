<template>
   <div class="container">
       <nav>
        <img src="../assets/Icon/menu.svg" @click="openNavigation()">
        <div class="notificationImage"></div>
        <div class="sub-container">
        <ul class="main">
            <li class="left" @click="logout()">My Devices</li>
            <li class="right"><div class="userImage"></div></li>
            <li class="right"><div id="notificationImage" class="notificationImage"></div></li>
            <li class="right"><input type="text" class="search" placeholder="Search Device"/></li>
        </ul>
        </div>
        </nav>
       <!-- Mobile Menu -->
       <div id="navbar" class="navbar">
           <a href="javascript:void(0)" class="closebtn" @click="closeNavigation()">&times;</a>
            <a>Profile</a>
            <a>Settings</a>
            <a @click="logout()">Logout</a>
        </div>

        <!-- Listing Devices  -->
        <div id="devices">
            <ul>
                 <li v-if="devices" :key="devices._id" v-for="devices in devices">
                      <h3>{{devices.deviceName}}</h3>
                 </li>
            </ul>
        </div>


   </div>
</template>

<style scoped>
.container{
    width: 100%;
    margin:auto;
    overflow-y: hidden;
    z-index: 1;
}
a{text-decoration:none;}

nav{
    width: 100%;
    height: 63px;
    position: fixed;
    z-index: 777;
}
nav img{
    float: left;
    width: 43px;
    margin-top: 0.65em;
    margin-left: 1em;
    cursor: pointer;
}
nav ul{display: none;}
.notificationImage{
    float: right;
    width: 32px;
    height: 32px;
    margin-top: 1.4em;
    margin-right: 1.3em;
    position: relative;
    border-radius: 10px;
    background-color: transparent;
    z-index: 0;
    cursor: pointer;
    background-position: center;
    background-size: cover;
    outline:none;
    background-image: url(../assets/Icon/bell.svg);
}
.navbar{
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: -2px;
    background-color: #f2f2f2;
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    border-right: 2px solid #000;
    z-index:777;
}
.navbar a {
    padding: 8px 8px 8px 32px;
    margin-top: 55px;
    text-decoration: none;
    font-size: 25px;
    color: #000;
    display: block;
    transition: 0.3s;
    outline: none;
    cursor: pointer;
}

.navbar .closebtn {
    position: absolute;
    top: 0;
    margin-left: -0.2em;
    font-size: 36px;
    margin-top: 0.05em;
}

/*----------------------Desktop Version*/
@media only screen and (min-width: 1200px) {
.navbar{display: none;} nav img{display: none;} nav .logo{display:none;}.sub-container{width: 70%;text-align: center;margin:auto;}
nav{
 width: 100%;
 height: 80px;
}
nav .main{
    display: block;
}
nav .main li{
    display: inline-flex;
    margin:15px;
    float: left;
    margin-left: 5em;
    cursor: pointer;
    
}
nav .main .left{
    font-size: 25px;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    margin-top: 1.80em;
}
nav .main .right{
    float: right;
    margin-top: 2.2em;
    margin-left: 0.5em;
}
.search{
    width: 200px;
}
.notificationImage{display: none;}
#notificationImage{
  display: block;
  width: 35px;
  height: 35px;
  margin-top: 0.2em;
  position: relative;
  border-radius: 10px;
  background-color: transparent;
  z-index: 0;
  background-position: center;
  background-size: cover;
  background-image: url(../assets/Icon/bell.svg);
}
.userImage{
  width: 40px;
  height: 40px;
  margin-top: 0em;
  border-radius: 20px;
  /* background-color: #000; */
  margin-left: -1.1em;
  background-image: url(../assets/Icon/profile.svg);
}

.search{
  margin-top: 0.2em;
  float: right;
  width: 14em;
  height: 35px;
  border-radius: 5px;
  padding-left: 45px;
  padding-top: 1px;
  outline:none;
  border:none;
  background-color:#f2f2f2;
  /* border:1px solid lightgrey; */
  color:#2741C8;
  background-image: url(../assets/Icon/search.svg);
  background-position: 12px 7px;
  background-size:small;
  background-repeat: no-repeat;
}




}


</style>



<script>
import axios from 'axios';
import store from '../store/store'
export default {
    data(){
        return{
            devices:''
        }
    },
    created(){
        this.requestDevices();
    },
    methods:{
        logout:function(){
         localStorage.removeItem('token');
         store.commit('logoutUser');
         this.$router.push({ name: 'landing' });
        },
        openNavigation:function(){
            let menu = document.getElementById('navbar').style.width = '101%';
        },
        closeNavigation:function(){
            let menu = document.getElementById('navbar').style.width = '0';
        },
        // Requesting data from the server
        requestDevices:function(){
            axios.post('http://46.103.120.51:10000/api/devices',localStorage.getItem('token'))
            .then(response => {
                 console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>
