<template>
    <div class="container">
        <h1>Device Properties</h1>
        <div class="main-elements">
            <ul>
                <li v-for="props in deviceprops" :key="props._id">
                    {{props.deviceName}}
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.container{
    width: 95;
    margin:auto;
}
</style>


<script>
import axios from 'axios';

export default {
    props:['properties'],
    data(){
        return{
            deviceprops:''
        }
    },
    methods:{
        requireProperties:function(){
            let deviceID = this.properties;
            axios.post('http://46.103.120.51:1540/api/device/properties',{deviceID},localStorage.getItem('token'))
            .then(response => {
                this.deviceprops = response.data;
                console.log(response);
           })
            .catch(error => {
                console.log(error);
           })
        },
    },
    created(){
        this.requireProperties();
    }
}
</script>
