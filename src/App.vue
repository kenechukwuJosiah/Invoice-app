<template>
<div v-if="invoicesLoaded">
    <div v-if="!mobile" class="app flex flex-column">
        <Navigation   />
        <div class="app-content flex flex-column">
            <Modal v-if="modalActive"/>
            <transition name="invoice_modal">
                <InvoiceModal v-if="invoiceModal"/>
            </transition>
            <router-view />
        </div>
    </div>
    <div v-else class="mobile-message flex flex-column">
        <h2>
            Sorry, this app is not supported on Mobile Devices
        </h2>
        <p>To use this app, please use a computer or tablet</p>
    </div>
</div>
</template>

<script>
import {mapState, mapActions } from 'vuex';
import Modal from './components/Modal.vue';
import Navigation from './components/Navigation.vue'
import InvoiceModal from './components/InvoiceModal.vue'
export default {

    components: {
      InvoiceModal,
      Modal,
        Navigation
    },
    data() {
        return {
            mobile: null
        }
    },
    created() {
        // this.checkScreen();
        window.addEventListener('resize', this.checkScreen);

        // this.invoiceData = [];
        this.GET_INVOICES();
    },

    computed: {
        ...mapState(['invoiceModal', 'modalActive', 'invoicesLoaded', 'invoiceData'])

    },

    methods: {
        ...mapActions(['GET_INVOICES']),
        checkScreen() {
            const windowWidth = window.innerWidth;

            if (windowWidth <= 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
        }
    }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

.app {
    background-color: #141625;
    min-height: 100vh;

    // flex-direction: column;
    @media (min-width: 900px) {
        flex-direction: row !important;
    }

    .app-content {
        padding: 0 20px;
        flex: 1;
        position: relative;
    }
}

button,
.button {
    cursor: pointer;
    padding: 16px 24px;
    border-radius: 30px;
    border: none;
    font-size: 12px;
    margin-right: 8px;
    color: #fff;
}

.mobile-message {
    text-align: center;
    justify-content: center;
    align-content: center;
    height: 100vh;
    background-color: #141625;
    color: #fff;

    p {
        margin-top: 20px;
    }
}

.dark-purple {
    background-color: #252945;
}

.red {
    background-color: #ec5757;
}

.purple {
    background-color: #7c5dfa;
}

.green {
    background-color: #33d69f;
}

.orange {
    background-color: #ff8f00;
}

// utility classes

.flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.container {
    width: 100%;
    padding: 40px 10px;
    max-width: 850px;
    margin: 0 auto;

    @media (min-width: 900px) {
        padding-top: 72px;
    }
}

.nav-link {
    text-decoration: none;
    color: initial;
}

// Status Button Styling

.status-button {
    &::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 8px;
    }

    font-size: 12px;
    margin-right: 30px;
    align-items: center;
    padding: 8px 30px;
    border-radius: 10px;
}

.paid {
    &::before {
        background-color: #33d69f;
    }

    color: #33d69f;
    background-color: rgba(51, 214, 160, 0.1);
}

.pending {
    &::before {
        background-color: #ff8f00;
    }

    color: #ff8f00;
    background-color: rgba(255, 145, 0, 0.1);
}

.draft {
    &::before {
        background-color: #dfe3fa;
    }

    color: #dfe3fa;
    background-color: rgba(223, 227, 250, 0.1);
}

//Animate Inovice
.invoice_modal-leave-active,
.invoice_modal-enter-active{
    transition: .8s ease all;
}

.invoice_modal-leave-to,
.invoice_modal-enter-from{
    transform: translateX(-700px);
}
</style>
