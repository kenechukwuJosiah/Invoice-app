<template>
  <div class="modal flex">
      <div class="modal-content">
          <p>Are you sure you want to exit? Your changes will not be saved</p>
          <div class="actions flex">
              <button @click="closeModal" class="purple">Return</button>
              <button @click="closeInvoice" class="red">Close</button>
          </div>
      </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name: "modal",
    computed: {
        ...mapState(['editInvoice'])
    },
    methods: {
        ...mapMutations(['TOGGLE_INVOICE', 'TOGGLE_MODAL', 'TOGGLE_EDIT_INVOICE']),
        closeModal(){
            this.TOGGLE_MODAL();
        },
        closeInvoice(){
            this.TOGGLE_INVOICE()
            this.TOGGLE_MODAL();
            if(this.editInvoice){
                this.TOGGLE_EDIT_INVOICE();
            }
        }
    },


}
</script>

<style scoped lang="scss">
    .modal{
        z-index: 100;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;

        .modal-content{
            border-radius: 20px;
            padding: 48px 32px;
            max-width: 450px;
            background-color: #252945;
            color: #fff;

            p{
                text-align: center;
            }
            .actions{
                margin-top: 24px;
                button{
                    flex: 1;
                }
            }
        }
    }
</style>