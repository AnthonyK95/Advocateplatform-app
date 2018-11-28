<template>
    <div class="container">
        <div class="top-box">
            <h1>Device Properties</h1>
        </div>
        <div class="information">
            <ul>
                <li  v-for="data in properties" :key="data._id">
                    <h3>{{data.deviceName}}</h3>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.container{
    width: 100%;
    margin:auto;
}

/*Desktop Design*/ 
@media only screen and (min-width: 1200px) {
.container{
    text-align: center;
    position: fixed;
    left:20%;
    padding-bottom:100px;
    max-width: 60%;
    width: calc(100% - 80px);
    min-height: 55vh;
    height: 60vh;
    top: -3em;
    bottom:30px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 8px 16px 0px rgba(173,190,247,1);
    border-top: 4px solid rgba(173,190,247,2);
    overflow-y: scroll;
    z-index: 777;
    margin:auto;
}
.top-box{
    width: 100%;
    height: 40vh;
    margin:auto;
    background-color: aqua;

}
.information{
    z-index: 777;
    width: 100%;
    margin:auto;
    color: black;
}
.information ul{list-style:none;}
.information ul li{
    display: block;
    margin-top: 100px;
}

}
</style>

<script>
import axios from 'axios';
import store from '../store/store';

export default {
    props:['props'],
    data(){
        return{
            properties:'',
            deviceName:''
        }
    },
     mounted(){
      this.escModal();
    //   this.clickOutside();
    },
    created(){
        this.getInformationAboutDevice();
    },
    methods:{
        getInformationAboutDevice(){
            // Getting the properties
            let deviceID = this.props;
            axios.post('http://46.103.120.51:10001/api/device/properties',{deviceID},localStorage.getItem('token'))
            .then(response => {
                console.log(response);
                // Sending the properties to the front
                this.properties = response.data;
            })
            .catch(error => {
                console.log(error);
            })
        },
        // Click Outside capture method
        //  clickOutside:function(){
        //    document.body.addEventListener('click', e=>{
        //        if(e.target !== document.getElementById('container')){
        //           this.$emit('closeTheModal');
        //        }
        //    });
        //  },
         escModal:function(){
            document.body.addEventListener('keyup', e => {
                if (e.keyCode === 27) { this.$emit('closeTheModal');}
            })
         },
         closeModal:function(){
           this.$emit('closeTheModal');
        },
    }
}
</script>
