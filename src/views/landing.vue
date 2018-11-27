<template>
    <div class="container">
        <div id="menu">
            <ul>
                <li>Home</li>
                <li>About</li>
                <router-link to='/login'><li>Login</li></router-link>
            </ul>
            <img src="../assets/Icon/databaseWrite.svg" width="40">
        </div><br>
        <div id="header">
           <h1>Advocate Platform</h1>
            <h3>IoT Consent Management System</h3>
            <router-link to="/register" style="color:white"><button>Register</button></router-link>
        </div>
    </div><!--Ending of Container -->
</template>


<style scoped>
.container{
    width: 75%;
    margin:auto;
}
a{
   text-decoration: none;
   color: inherit;
}
#menu{
    width: 100%;
}
#menu ul {
    list-style: none;
    /* margin-left: 50px; */
}
#menu ul li{
    display: inline-flex;
    padding:15px;
    margin-top: 50px;
    cursor: pointer;
    font-size:18px;
    float: left;
    font-family: 'Montserrat', sans-serif;
}
#menu img{
    float: right;
    margin-top: 60px;
    /* margin-right: 100px; */
}
#header{
    text-align: center;
   
}
#header h1{
    font-size: 55px;
    margin-top: 20%;
}
#header h3{
    font-size: 30px;
    color: grey;
    }
#header button{
    margin-top: 50px;
    width: 150px;
    height: 45px;
    background-color: #0066FF;
    border:none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    outline:none;
    transition: 0.2s;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.3);
}
#header button:hover{
    width: 170px;
}
</style>
