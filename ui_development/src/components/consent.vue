<template>
    <div class="container">
        <div id="consent">
            <h1>Contract Management for: {{deviceName}} </h1>
            <ul>
                <!-- Listing the contract informatin to the user  -->
                <li :key="information._id" v-for="information in contract_information">
                    <form @submit.prevent="validateChecked">
                        <input type="checkbox"  value="agreed_on_data_requested_one" v-model="checkedInfromation" >
                        <label for="agreed_on_data_requested_one">Uptime data will be collected periodically</label><br>
                        <input type="checkbox"  value="agreed_on_data_requested_two" v-model="checkedInfromation" >
                        <label for="agreed_on_data_requested_two">Location data will be collected periodically</label><br>
                        <input type="checkbox"  value="agreed_on_profiling" v-model="checkedInfromation" >
                        <label for="agreed_on_profiling">Vendor will use your information for profiling</label><br>
                        <input type="checkbox"  value="agreed_on_manual_process" v-model="checkedInfromation" >
                        <label for="agreed_on_manual_process">Vendor will use your information for manual_process</label><br>
                        <input type="checkbox"  value="agreed_on_time_period" v-model="checkedInfromation" >
                        <label for="agreed_on_time_period">We are going to Collect data Until August 5 2019</label><br>
                        <input type="checkbox"  value="agreed_on_purpose_req_one" v-model="checkedInfromation" >
                        <label for="agreed_on_purpose_req_one">Uptime data will be used to identify potential bugs</label><br>
                        <input type="checkbox"  value="agreed_on_purpose_req_two" v-model="checkedInfromation" >
                        <label for="agreed_on_purpose_req_two">Identity Verification Of User with Login Establish Geolocation</label><br>
                        <input type="checkbox"  value="agreed_on_third_parties" v-model="checkedInfromation" >
                        <label for="agreed_on_third_parties">We are going to share the data with Wayne Enterprise</label><br>
                        <input type="checkbox"  value="agreed_on_third_countries" v-model="checkedInfromation" >
                        <label for="agreed_on_third_countries">We are going to share your data with Non-Eu Recipients</label><br>
                        <input type="checkbox"  value="agreed_on_automated_proccessing" v-model="checkedInfromation" >
                        <label for="agreed_on_automated_proccessing">Let us use your information for automated_proccessing </label><br>
                        <input type="submit" class="confirm" value="Submit">
                    </form>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
//Imported Libraries
import axios from 'axios'
import vuex from 'vuex'
export default {
    props:['properties'],
    data(){
        return{
            contract_information:'',
            deviceName:'',
            checkedInfromation: []
        }
    },
    created(){
        this.requestingContractInformatino()
    },
    methods:{
        validateChecked:function(){
            let confirmed = [];
            let contractID = this.properties;            
            confirmed.push(this.checkedInfromation)
            axios.post('http://localhost:8080/api/dashboard/postcontractConsent',{confirmed,contractID},localStorage.getItem('token'))
            .then(response => {
               if(response.data.message === 'success'){
                   location.reload()
               }
            })
            .catch(error => {
                console.log(error)
            })
        },
        requestingContractInformatino:function(){
            let IDcontract = this.properties;
            axios.post('http://localhost:8080/api/dashboard/reqcontractConsent',{IDcontract},localStorage.getItem('token'))
            .then(resposne =>{
                this.contract_information = resposne.data
                this.deviceName = resposne.data.information.deviceName
            })
            .catch(error => {
                console.log(error)
            })
        },
    }
}
</script>


<style scoped>
.container{
    width: 100%;
    margin:auto;
}

.confirm{
    width: 150px;
    height: 40px;
    background-color: #4da6ff;
    border:none;
    color: white;
    border-radius: 5px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.17);
    cursor: pointer;
    transition: 0.1s ease-in-out;
}
.confirm:hover{
    width: 170px;
}
#consent{
    width: 100%;
    margin:auto;
    /* border-top: 4px solid #000; */
    margin-top: 3em;
    border-radius: 7px;
    margin-bottom: 10em;
    /* box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.17); */
}
#consent h1{
    margin-top: -1em;
    position: relative;
    margin-left: 2em;
    text-align:none;
    font-family: 'PT Sans', sans-serif;
    font-weight: normal;
}
#consent ul{list-style:none;overflow-x:default; }
#consent ul li{
    text-align:center;
    width: 100%;
    font-family: 'PT Sans', sans-serif;
    padding-bottom: -2em;
}
#consent ul li input{
    margin-top: 2em;
}
</style>