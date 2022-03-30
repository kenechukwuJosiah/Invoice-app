<template>
<div class="home container">

    <!-- Header -->
    <div class="header flex">
        <div class="left flex flex-column">
            <h1>Invoices</h1>
            <span>There are {{filteredData.length}} total invoices</span>
        </div>
        <div class="right flex">
            <div @click="toggleFilterMenu" class="filter flex">
                <span>
                    Filter by status
                    <span v-if="filteredInvoice"> : {{filteredInvoice}}</span>
                </span>
                    <img src="@/assets/icon-arrow-down.svg" alt="">
                <ul v-show="filterMenu" class="filter-menu">
                    <li @click="filterInvoices">Draft</li>
                    <li @click="filterInvoices">Pending</li>
                    <li @click="filterInvoices">Paid</li>
                    <li @click="filterInvoices">Clear Filter</li>
                </ul>
            </div>
            <div @click="newInvoice" class="button flex">
                <div class="inner-button flex">
                    <img src="@/assets/icon-plus.svg" alt="">
                </div>
                <span>New Invoice</span>
            </div>
        </div>
    </div>
<!-- INvoices -->
<div v-if="filteredData.length > 0">
  <Invoice v-for="(invoice, index) in filteredData" :invoice="invoice" :key="index"/>
</div>
<div class="empty flex flex-column" v-else>
  <img src="../assets/illustration-empty.svg" alt="">
  <h3>There is nothing here</h3>
  <p>Create a new inoice y clicking the New Invoice button and get started</p>
</div>
</div>
</template>

<script>
import Invoice from '../components/Invoice.vue';
import {mapMutations, mapState} from 'vuex';
export default {
    name: "Home",
    components: {
      Invoice
    },
    data(){
      return{
        filterMenu: null,
        filteredInvoice: null
      }
    },

    computed: {
      ...mapState(['invoiceData']),
      filteredData(){
        return this.invoiceData.filter(invoice => {
          if(this.filteredInvoice == 'Draft'){
            return invoice.invoiceDraft == true;
          }
          if(this.filteredInvoice == 'Pending'){
            return invoice.invoicePending == true;
          }
          if(this.filteredInvoice == 'Paid'){
            return invoice.invoicePaid == true;
          }
          return invoice;
        })
      }
    },

    methods: {
      ...mapMutations(['TOGGLE_INVOICE']),
      newInvoice(){
        this.TOGGLE_INVOICE();
      },
      toggleFilterMenu(){
        this.filterMenu = !this.filterMenu;
      },
      filterInvoices(e){
        if(e.target.innerText === 'Clear Filter'){
          this.filteredInvoice = null;
          return;
        }
        this.filteredInvoice = e.target.innerText;
      }
    }
};
</script>

<style lang="scss" scoped>
.home {
    color: #fff;

    .header {
        margin-bottom: 65px;

        .left,
        .right {
            flex: 1;
        }

        .right {
          height: 46px;
            justify-content: flex-end;
            align-content: center;

            .button,
            .filter {
                align-items: center;

                span {
                    font-size: 12px;
                }
            }

            .filter {
                position: relative;
                margin-right: 40px;
                  cursor: pointer;

                // span,
                // img {
                //     pointer-events: none;
                // }

                img {
                    margin-left: 12px;
                    width: 10px;
                    height: 6px
                }
                .filter-menu{
                  width: 120px;
                  position: absolute;
                  top: 50px;
                  list-style: none;
                  background-color: #1e2139;
                  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),  0, 2px 4px -1px rgba(0,0,0,0.06);
                  
                  li{
                    cursor: pointer;
                    font-size: 12px;
                    padding: 10px 20px;

                    &:hover{
                      color: #1e2139;
                      background-color: #fff;
                    }
                  }
                }
            }

            .button{
              padding: 5px 10px;
              background-color: #7c5dfa;
              border-radius: 40px;
 
              .inner-button{
                margin-right: 8px;
                border-radius: 50%;
                padding: 8px;
                align-items: center;
                justify-content: center;
                background-color: #fff;
                img{
                  width: 10px;
                  height: 10px;
                }
              }
            }

        }
    }

    .empty{
      margin-top: 160px;
      align-items: center;

      img{
        width: 214px;
        height: 200px
      }

      h3{
        font-size: 20px;
        margin-top: 40px;
      }

      p{
        text-align: center;
        max-width: 224px;
        font-size: 12px;
        font-weight: 300;
        margin-top: 16px;
      }
    }
}
</style>
