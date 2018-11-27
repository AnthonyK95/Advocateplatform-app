<template>
    <div class="container" id="container">
        <h1>Settings</h1>
    </div>
</template>

<style scoped>
.container{
   text-align: center;
    position: fixed;
    left:22%;
    padding-bottom:100px;
    width: 55vw;
    max-width: 100%;
    min-height: 55vh;
    height: 60vh;
    top: 0em;
    bottom:30px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 8px 16px 0px rgba(173,190,247,1);
    border-top: 4px solid rgba(173,190,247,2);
    overflow-y: scroll;
    z-index: 777;
    margin:auto;
}
</style>
<script>
export default {
     mounted(){
      this.escModal();
      this.clickOutside()
    },
    methods:{
        // Click Outside capture method
         clickOutside:function(){
           document.body.addEventListener('click', e=>{
               if(e.target != document.getElementById('container')){
                  this.$emit('closeTheModal');
               }
           });
         },
         escModal:function(){
            document.body.addEventListener('keyup', e => {
                this.$emit('closeTheModal');
            })
         },
         closeModal:function(){
           this.$emit('closeTheModal');
        },
    }
}
</script>
