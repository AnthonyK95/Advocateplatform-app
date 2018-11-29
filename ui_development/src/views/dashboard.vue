<template>
   <div class="container">
       <nav>
        <img src="../assets/Icon/menu.svg" @click="openNavigation()">
        <div class="notificationImage"></div>
        <div class="sub-container">
        <ul class="main">
            <li class="left">My Devices</li>
            <li class="right" @click="enableDrop('user')"><div class="userImage"></div></li>
            <li class="right" @click="enableDrop('notification')"><div id="notificationImage" class="notificationImage">
                <div v-if="notification_counter" class="notify_count">{{notification_counter}}</div>  
            </div></li>
            <li class="right" @click="showModal('newDevice')"><div id="addDevice" class="addDevice"></div></li>
            <li class="right"><input type="text" class="search" placeholder="Search Device"/></li>
        </ul>
         <div id="dropdown-content" @mouseleave="disableDrop()">
              <h4 class="h4">profile</h4>
              <h4 class="h4" @click="showModal('settings')">Settings</h4>
              <h4 class="h4" @click="logout()">Logout</h4>
         </div>
          <div id="notification-content" @mouseleave="disableDrop()">
              <ul class="contracts">
                  <h1>Notifications</h1>
                  <li v-for="notify in notification_content" :key="notify._id">
                      <div class="vendorImage"></div><!-- Will show the image of the vendor TODO: -->
                      <h2>{{notify.deviceVendor}} has a contract ready for you</h2>
                      <h3>{{notify.deviceName}} is ready for review</h3>
                  </li>
              </ul>
         </div>
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
            <div class="inside-container">
                <ul>
                    <li @click="showModal('devprops',devices._id)" v-if="devices" :key="devices._id" v-for="devices in devices">
                        <h3>{{devices.deviceName}}</h3><br>
                        <h4>127.0.0.1</h4>
                        <!-- <h2 style="margin-top:50px;font-size:15px;color:lightgrey;">Vendor: vendor1</h2> -->
                    </li>
                </ul>
                <ul  v-if="devices == ''">
                    <h3 class="nodevice">Get started and add your first device</h3><br>
                    <img class="theimg" src="../assets/Icon/inbox.svg" width="40" alt="">
                </ul>
            </div>
        </div>
        <modal v-show="isModalVisible" @close="closeModal">
            <div slot="componentName" >
                <component :properties="props" v-bind:is="componentName"></component>
            </div>
        </modal>
   </div>
   
</template>



<script>
import axios from 'axios';
import store from '../store/store';
import settings from '../components/settings';
import devprops from '../components/devprops';
import newDevice from '../components/newDevice';
import modal from '../components/modal';


axios.defaults.headers.post['Authorization'] = localStorage.getItem('token')
export default {
    data(){
        return{
            devices:'',
            isModalVisible:false,
            status:'false',
            componentName:'',
            props:'',
            notification_counter:'',
            notification_content:''
        }
    },
    components:{
        modal
    },
   methods:{
    showModal(template,properties) {
       this.isModalVisible = true;
       if(template == 'settings'){this.componentName = settings;}
       if(template == 'devprops'){this.componentName = devprops;this.props = properties;}
       if(template == 'newDevice'){this.componentName = newDevice;}
    },
    closeModal() {
      this.isModalVisible = false;
    },
    // Closing the modal -> action
    thecloseModal:function(variable){
      this.status = variable;
    },
    enableDrop:function(view){
        let menu = document.getElementById('dropdown-content');
        let notification = document.getElementById('notification-content');
        if(view === 'user'){menu.style.display = 'block';notification.style.display='none';}
        if(view === 'notification'){notification.style.display = 'block';menu.style.display='none';}
    },
    disableDrop:function(){
        let menu = document.getElementById('dropdown-content').style.display='none';
        let notification = document.getElementById('notification-content').style.display='none';
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
      axios.post('http://46.103.120.51:1540/api/devices',localStorage.getItem('token'))
      .then(response => {
        this.devices = response.data.response;
    })
    .catch(error => {
        console.log(error);
     })
    },
     notificationBadge:function(){
      axios.post('http://46.103.120.51:1540/api/dashboard/notification',localStorage.getItem('token'))
      .then(response =>{
        if(response === null){
          console.log('null');
        }
        else{
          this.notification_content = response.data.notification;
          console.log(response.data.notification);
          this.notification_counter = response.data.notification_counter;
        }

      })
      .catch(error => {
        console.log(error)
      })
    },
    dashboardValidation:function(){
      axios.defaults.headers.post['Authorization'] = localStorage.getItem('token')
        axios.post('http://46.103.120.51:1540/api/validation',localStorage.getItem('token'))
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
mounted(){this.requestDevices();this.notificationBadge();},
created(){
    this.dashboardValidation();
 },
}
</script>




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
    /* background-color: #f2f2f2; */
    background-color: white;
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
.nodevice{
  font-size: 20px;
  margin-top:22em;
  text-align: center;
  /* margin-left: 2.5em; */
  margin-left: 15%;
  text-align:center;
  font-family: 'Raleway', sans-serif;
  color: darkgrey;
}
.theimg{
    /* margin-left: 4em; */
    margin-left: 16%;
}
#dropdown-content {display: none;}
#notification-content{display: none;}
/*----------------------Desktop Version*/
@media only screen and (min-width: 1200px) {
.navbar{display: none;} nav img{display: none;} nav .logo{display:none;}.sub-container{width: 70%;text-align: center;margin:auto;}
nav{
 width: 100%;
 height: 80px;
}

/*Minimize the length of the outer-container*/ 
.inside-container{
    width: 90%;
    margin:auto;
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
    /* font-family: 'Roboto', sans-serif; */
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    margin-top: 1.8em;
}
nav .main .right{
    float: right;
    margin-top: 2.2em;
    margin-left: 0.5em;
}
.search{
    width: 200px;
}
.nodevice{
  font-size: 20px;
  margin-top:22em;
  text-align: center;
  margin-left: 0%;
  font-family: 'Raleway', sans-serif;
  color: darkgrey;
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
  /* background-color:#2741C8; */
  background-color: #385d8b;
  border-radius: 6px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.3);
  color: white;
}

#devices ul li h3{
    color: white;
    text-align: center;
    position: absolute;
    margin-left: 1em;
    margin-top: 1em;
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

.nodevice{margin-left: 0%;}
.theimg{margin-left:0px;}
.notify_count{
  width: 17px;
  text-align: center;
  border:none;
  border-radius: 20px;
  background-color: black;
  margin-left:2em;
  color: white;
  font-size: 14px;
  /* padding-bottom: 0.2em; */
  /* padding-right: 0.05em; */
  padding-right: 0.05em;
  padding-top: 0.05em;
}



/*Dropdown Modal*/

#dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 250px;
    top: 5.5em;
    right: 10%;
    border:1px solid #f2f2f2;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.12);
    padding: 12px 16px;
    z-index: 1;
    border-radius: 5px;
}
#dropdown-content .h4{
  text-align: center;
  margin-top: 1.5em;
  padding-top: 0.5em;
  padding-bottom:0.5em;
  margin-bottom: 1.5em;
  font-weight: 700;
  font-family: 'Open Sans', sans-serif;
  font-size: 12pt;
  color: black;
  cursor: pointer;
}

#notification-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 450px;
    height: 300px;
    top: 6em;
    border:1px solid #f2f2ff;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.12);
    padding-left: 0.5em;
    padding-right: 1em;
    padding-bottom: 1.2em;
    padding-top: 0.7em;
    z-index: 1;
    right: 15%;
    border-radius: 5px;
    text-align:center;
    overflow-x: hidden;
}
.contracts{
    display: block;
}

 .notification_label{
    width: 100%;
    height: 50px;
    background-color: grey;
    color: white;
    position: fixed;
    top:6.7em;
    left: -0.5em;
    z-index: 7;
}


#notification-content ul{display: block;width: 100%;margin-top: 50px;}
#notification-content ul li{
    list-style: none;
    width: 100%;
    margin-left: 4.5px;
    height:auto;
    border-radius: 5px;
    cursor: pointer;
}
#notification-content ul li:hover{
    background-color:#f2f2f2;
    border-radius: 5px;
}
#notification-content ul li h2{
    margin-left: 2em;
    text-align: center;
    font-size: 19px;
    font-family: 'Open Sans', sans-serif;
    position: relative;
    top: -1.3em;
}
#notification-content ul li h3{
    text-align:center;
    font-size: 15px;
    position: relative;
    top:-1.0em;
    left: 0.8em;
    font-family: 'Open Sans', sans-serif;
}
.vendorImage{
    width: 47px;
    position: relative;
    height: 47px;
    background-color: black;
    border-radius: 100px;
    top:1.35em;
    left: 1.7em; 
}
#notification-content ul h1{
    position: fixed;
    height: 40px;
    padding-right: 15em;
    top: 4em;
    margin-left: -0.4em;
    padding-left: 10px;
    padding-top: 15px;
    color: grey;
    background-color: #f2f2f2;
    z-index: 777;
}
}

</style>
