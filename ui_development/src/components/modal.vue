
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <slot name="deleteDevice"></slot>
            <span class="closebutton" @click="close">&times;</span>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <!-- Displaying the  -->
          <slot name="componentName"></slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    mounted(){this.escModal();},
    methods: {
      menu:function(){
        console.log('hello');
        
      },
      // Closing the menu on escape
      escModal:function(){
        document.body.addEventListener('keyup', e => {
          if (e.keyCode === 27) {this.$emit('close');}
        })
      },
      close:function(){
        this.$emit('close');
      },
    },
  };
</script>



<style>



.modal-backdrop{
    position: absolute;
    top: 0;
    z-index:777;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:white;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
}
.modal{
  overflow-y: hidden;
  width: 100%;
}
  .modal-header,
  .modal-footer {
    padding: 7px;
    margin-left: 0.5em;
    display: flex;
    flex-grow:initial;
  }
 .modal-body {
    position: relative;
    /* height: auto; */
    overflow: hidden;
  }

  .closebutton {
    text-align:center;
    justify-content: space-between;
    color: #000;
    margin-top: 0.8em;
    margin-left: 0.3em;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    flex: 0;
}
  .closebutton:hover,
 .closebutton:focus {
    color: red;
    text-decoration: none;
}

/*Desktop Version*/ 
@media only screen and (min-width: 1200px) {

  .modal-backdrop {
    position: fixed;
    top: -10px;
    z-index:777;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.20);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: white;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.15);
    overflow-x: auto;
    width: 60%;
    height: auto;
    border-radius: 5px;
    display: flex;
    flex-direction: column;

  }

  .modal-header,
  .modal-footer {
    padding: 7px;
    margin-left: 0.5em;
    display: flex;
    flex-grow:initial;
  }

  .modal-header {
    /* border-bottom: 1px solid #eeeeee; */
    color: #4AAE9B;
    justify-content: space-between;
    margin-top: -1em;
    position: relative;
    -ms-flex-align:left;
  }

 

  .modal-body {
    position: relative;
    height: auto;
  }

  .closebutton {
    text-align:center;
    justify-content: space-between;
    color: #000;
    margin-top: 0.8em;
    margin-left: 0.3em;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    flex: 0;
}
  .closebutton:hover,
 .closebutton:focus {
    color: red;
    text-decoration: none;
}
}
</style>
