<template>
    <div class="container">
            <div id="box">
                <form @submit.prevent="postdb">
                    <input type="email" v-model="data.email" label="email" autocomplete="off" placeholder="Email Address" required><br>
                    <input type="text" v-model="data.username" label="username" autocomplete="off" placeholder="Username" required><br>
                    <input type="password" v-model="data.password" label="password" placeholder="Password" required><br>
                    <input type="submit" value="Register">
                </form>
            </div>
    </div>       
</template>




<script>
import axios from 'axios'
import store from '../store/store'
export default {
   data(){
       return{
          data:{
              email:'',
              username:'',
              password:''
          }
        }   
   },
    methods:{
       postdb:function(){
          let credentials = {
              email: this.data.email,
              username:this.data.username,
              password:this.data.password
          }
          axios.post('http://46.103.120.51:10000/api/register',credentials)
          .then(response=>{
             store.commit('loginUser')
             localStorage.setItem('token',response.data)
             this.$router.push({name:'dashboard'})
          })
          .catch(err => console.log(err));
       }
   },
 }
</script>



<!-- Style --> 
<style scoped>
.container{
    width: 100%;
    height: 100vh;
    margin: auto;
    background-color: #eff2f7;
}
#box{
    width: 100%;
    /* margin-top: 10px; */
    padding-top: 10em;
}
form{
    text-align: center;
    margin-top: 100px;
    padding-top: 50px;
    width: 400px;
    margin-top: 100px;
    padding-bottom: 50px;
    margin:auto;
    border-radius: 10px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    background-color: white;
}
form [type = "text"]{
    width: 200px;
    margin-top: 20px;
    height: 30px;
    border:1px solid lightgrey;
    border-radius: 5px;
    padding:10px;
    background-color: white;
    box-shadow: 0 0 2px 0 lightgray;
}
form [type = "email"]{
    width: 200px;
    margin-top: 30px;
    height: 30px;
    border:1px solid lightgrey;
    border-radius: 5px;
    padding:10px;
    background-color: white;
    box-shadow: 0 0 2px 0 lightgray;
}
form [type = "password"]{
    width: 200px;
    margin-top: 20px;
    height: 30px;
    border:1px solid lightgrey;
    border-radius: 5px;
    padding:10px;
    background-color: white;
    box-shadow: 0 0 2px 0 lightgray;
}
form [type = "submit"]{
    height: 50px;
    border:none;
    border-radius: 5px;
    color: white;
    width: 200px;
    margin-top: 20px;
    cursor: pointer;
    background-color: #0066FF;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    transition: .2s;
}
form [type = "submit"]:hover{
    width: 220px;
}
</style>

