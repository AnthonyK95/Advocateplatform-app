<template>
    <div id="get">
        <ul>
            <!-- Listing all the devices -->
            <li v-bind:key="index" v-for="(todo, index) in todos">
                <h1>{{todo.name}}</h1>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    // Sending the data back to the vue component
    data () {
      return  {
          todos:[]
        }
    },
    // Creating the methods-> requesting data
 methods:{
    //  returning the data from controller->http get to filter device
      requestingIpData:function(){
            this.$http.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {

              this.todos = response.data;
              console.log(response);
            })
        }
 },

 //Initialize the functions->add the functions
 created(){
    this.requestingIpData();
 }

}//Ending

</script>
