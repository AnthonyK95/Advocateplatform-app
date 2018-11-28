<template>
    <div class="container">
       <div id="box">
            <form @submit.prevent="registerDevice">
                <input type="email" v-model="data.email" label="email" autocomplete="off" placeholder="Email Address" required><br>
                <input type="password" v-model="data.password" label="password" placeholder="Password" required><br>
                <input type="submit" value="Regster Device">
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    data(){
        return{
            data:''
        }
    },
    methods:{
        registerDevice:function(){
            console.log(this.data);
        },
    }
}
</script>




<!--Style -->
<style scoped>
a{text-decoration: none;
color: #0066FF;}
.container{
    width: 100%;
    margin:auto;
}

#box{
    width: 100%;
    margin:auto;
}
#box form h3{
    margin-top: 1em;
    font-size: 15px;
    float: left;
    position: relative;
    left: 1em;
}

#box form{
    text-align:center;
    margin-top: 13em;
    width: 100%;
}
form [type = "email"]{
    width: 90vw;
    padding-left:20px;
    height: 60px;
    border:1px solid #0066FF;
    border-radius: 5px;
    outline:none;
}

form [type = "password"]{
    width: 90vw;
    padding-left:20px;
    margin-top: 2em;
    height: 60px;
     border:1px solid #0066FF;
    border-radius: 5px;
    outline:none;
}
form [type = "submit"]{
    width: 96vw;
    /* padding-left:20px; */
    margin-top: 2em;
    height: 60px;
    background-color: #0066FF;
    text-align: center;
    border:none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}

@media only screen and (min-width: 1200px) {
.container{
    width: 100%;
    margin: auto;
}
#box{
    width: 100%;
    text-align: center;
    margin-top: 2em;
    margin-bottom: 2em;
}
#box form{
    text-align: center;
    margin-top: 100px;
    padding-top: 40px;
    width: 400px;
    margin-top: 100px;
    padding-bottom: 50px;
    margin:auto;
    border-radius: 10px;
    /* box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4); */
    background-color: white;
}

#box form [type = "email"]{
    width: 300px;
    margin-top: 30px;
    height: 30px;
    border:1px solid lightgrey;
    border-radius: 5px;
    padding:10px;
    background-color: white;
    box-shadow: 0 0 2px 0 lightgray;
}

#box form [type = "password"]{
    width: 300px;
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
    width: 320px;
    margin-top: 20px;
    cursor: pointer;
    background-color: #0066FF;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    transition: .2s;
}
form [type = "submit"]:hover{
    width: 335px;
}
#box form h3{
    margin-top: 1em;
    font-size: 15px;
    float: left;
    position: relative;
    left: 2.8em;
}




}
</style>
