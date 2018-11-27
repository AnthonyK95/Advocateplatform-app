<template>
   <div class="container">
       <nav>
        <img src="../assets/Icon/menu.svg" @click="openNavigation()">
        <div class="notificationImage"></div>
        <div class="sub-container">
        <ul class="main">
            <li class="left"  @click="logout()">My Devices</li>
            <li class="right" @click="changeModal('settings')"><div class="userImage"></div></li>
            <li class="right"><div id="notificationImage" class="notificationImage"></div></li>
            <li class="right"><div id="addDevice" class="addDevice"></div></li>
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
        <!-- Listing Devices hybrid-->
        <div id="devices">
            <ul>
                 <li v-if="devices" :key="devices._id" v-for="devices in devices">
                    <h3>{{devices.deviceName}}</h3><br>
                    <h4>127.0.0.1</h4>
                    <h2 style="margin-top:50px;font-size:15px;color:lightgrey;">Vendor: vendor1</h2>
                 </li>
            </ul>
        </div>
    <component @keydown.esc="closeModal(false)" @closeTheModal='closeModal(false)' v-if="status == true" :props="props" v-bind:is="modalComponent"/>
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
    background-color: white;
    
}
nav img{
    float: left;
    width: 44px;
    margin-top: 0.72em;
    margin-left: 1em;
    cursor: pointer;
}
nav ul{display: none;}
.notificationImage{
    float: right;
    width: 32px;
    height: 32px;
    margin-top: 1.09em;
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
    margin-left: -0.1em;
    font-size: 36px;
    margin-top: 0.1em;
}

#devices{
  width: 100%;
  margin:auto;
  margin-top: 12em;
  margin-bottom: 5em;
}
#devices ul{
  width: 100%;
  text-align: center;
  list-style: none;
  margin-top: -8em;
  margin-left: -2.10em;
  display: block;
}
#devices ul li{
  display: inline-block;
  margin-top: 20px;
  margin-left: 50px;
  cursor: pointer;
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
  font-stretch: extra-condensed;
  height: 180px;
  width: 360px;
  background-color:#2741C8;
  border-radius: 6px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.3);
  color: white;
}


#devices ul li h3{
    color: white;
    float: left;
    text-align: center;
    position: relative;
    margin-left: 1em;
    margin-top: 1em;
}

#devices ul li h4{
    margin-top: 8em;
    margin-left: -16em;
    position: relative;;
}

.addDevice{
    display: none;
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
    margin-top: 2.00em;
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
  margin-top: 0.25em;
  float: right;
  width: 14em;
  height: 39px;
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

#devices{
  width: 100%;
  margin:auto;
  margin-top: 10em;
  margin-bottom: 5em;
}
#devices ul{
  width: 100%;
  text-align: center;
  list-style: none;
  margin-top: -20px;
}
#devices ul li{
  display: inline-block;
  margin-top: 100px;
  margin-left: 50px;
  cursor: pointer;
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
  font-stretch: extra-condensed;
  height: 180px;
  width: 250px;
  background-color:#2741C8;
  border-radius: 6px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.3);
  color: white;
}

#devices ul li h3{
    color: white;
    text-align: center;
    position: absolute;
    margin-left: 1em;margin-top: 1em;
}

#devices ul li h4{
    margin-top: 8em;
    margin-left: 1em;
    position:absolute;
}

.addDevice{
    display: block;
    width: 32px;
    height: 32px;
    margin-top: 0.3em;
    background-image: url(../assets/Icon/add.svg);
    background-size: cover;
    background-repeat: no-repeat;
    background-color:transparent; 
}












}

</style>



<script>
import axios from 'axios';
import store from '../store/store'
import settings from '../components/settings'

axios.defaults.headers.post['Authorization'] = localStorage.getItem('token')
export default {
    data(){
        return{
            devices:'',
            status:false,
            modalComponent:'',
            props:''
        }
    },
   methods:{
        changeModal(template,props){
            if(template == 'settings'){this.modalComponent = settings;this.status=true}    
            if(template == 'deviceProperties'){console.log('deviceProperties')}
        },
        // Closing the modal -> action
        closeModal:function(variable){
            this.status = variable;
         },
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
            axios.post('http://46.103.120.51:10001/api/devices',localStorage.getItem('token'))
            .then(response => {
                console.log(response)
               this.devices = response.data.response;
            })
            .catch(error => {
                console.log(error);
            })
        },
         dashboardValidation:function(){
          axios.defaults.headers.post['Authorization'] = localStorage.getItem('token')
            axios.post('http://46.103.120.51:10001/api/validation',localStorage.getItem('token'))
            .then(response => {
                if(response.data == "Expired"){
                    console.log('Token has been expired');
                    this.$router.push({name:'login'});
                    store.commit('logoutUser');
                    localStorage.removeItem('token');
                }
                else{
                    store.commit('loginUser');
                }
            })
            .catch(err => {
                console.log(err)
            })
         },
       
    },
    mounted(){this.requestDevices();},
       created(){
        this.dashboardValidation();
       
    },
}
</script>
