
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <span class="closebutton" @click="close()">&times;</span>
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
    data(){
        return{
            
        }
    },
    mounted(){this.escModal();},
    methods: {
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
  .modal-backdrop {
    position: fixed;
    top: -10px;
    z-index:777;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    width: 60%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    /* border-bottom: 1px solid #eeeeee; */
    color: #4AAE9B;
    justify-content: space-between;
    margin-top: -1em;
  }

  

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .closebutton {
    text-align:center;
    justify-content: space-between;
    color: #aaa;
    margin-top: 0.5em;
    margin-left: 0.5em;
    font-size: 28px;
    font-weight: bold;
}
  .closebutton:hover,
 .closebutton:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>