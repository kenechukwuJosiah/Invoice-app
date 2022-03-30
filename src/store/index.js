import { createStore } from 'vuex';
import { getDoc, getDocs,updateDoc, doc, deleteDoc, collection } from 'firebase/firestore/lite'
import db from '../firebase/firebaseInit';

export default createStore({
  state: {
    invoiceData: [],
    invoiceModal: null,
    modalActive: null,
    invoicesLoaded: null,
    currentInvoiceArray: null,
    editInvoice: null
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    SET_INVOICE_DATA(state, payload) {
      // state.invoiceData.length = [];
      state.invoiceData.push(payload);
    },
    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
    SET_CURRENT_INVOICE(state, payload) {
      state.currentInvoiceArray = state.invoiceData.filter(invoice => invoice.invoiceId == payload)
    },
    TOGGLE_EDIT_INVOICE(state){
      state.editInvoice = !state.editInvoice;
    },
    DELETE_INVOICE(state, invoiceId){
      state.invoiceData = state.invoiceData.filter(invoice=> invoice.invoiceId !== invoiceId);

    },
    UPDATE_STATUS_TO_PAID(state, invoiceId){
      state.invoiceData.forEach(invoice => {
        if(invoice.invoiceId == invoiceId){
          invoice.invoicePaid = true;
          invoice.invoicePending = false;
        }
      })
    },
    UPDATE_STATUS_TO_PENDING(state, invoiceId){
      state.invoiceData.forEach(invoice => {
        if(invoice.invoiceId == invoiceId){
          invoice.invoicePaid = false;
          invoice.invoicePending = true;
          invoice.invoiceDraft = false;
        }
      })
    },
  },
  actions: {
    async UPDATE_INVOICE({commit, dispatch}, {invoiceId, routeId}){
      commit('DELETE_INVOICE', invoiceId);

      await dispatch('GET_INVOICES');
      commit('TOGGLE_INVOICE');
      commit('TOGGLE_EDIT_INVOICE')
      commit('SET_CURRENT_INVOICE', routeId);
      console.log('ROUTE ID', routeId)
    },
    async DELETE_INVOICE({commit}, invoiceId){
      await deleteDoc(doc(db, "invoices", invoiceId));
      commit('DELETE_INVOICE',invoiceId);
    },
    async UPDATE_STATUS_TO_PAID({commit}, invoiceId){
      await updateDoc(doc(db, 'invoices', invoiceId), {
        invoicePaid: true,
        invoicePending: false
      });

      commit('UPDATE_STATUS_TO_PAID', invoiceId);
    },
    async UPDATE_STATUS_TO_PENDING({commit}, invoiceId){
      await updateDoc(doc(db, 'invoices', invoiceId), {
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false
      });

      commit('UPDATE_STATUS_TO_PENDING', invoiceId);
    },
    async GET_INVOICES({ commit, state }) {
      try {
        const invoiceRef = collection(db, "invoices");

        const invoiceSnap = await getDocs(invoiceRef);
        const invoiceList = invoiceSnap.docs.map(doc => doc.data());
       state.invoiceData = [];
        invoiceList.forEach(doc => {
          if (!state.invoiceData.some(invoice => invoice.invoiceId === doc.invoiceId)) { }
          const data = {
            invoiceId: doc.invoiceId,
            billerStreetAddress: doc.billerStreetAddress,
            billerCity: doc.billerCity,
            billerZipCode: doc.billerZipCode,
            billerCountry: doc.billerCountry,
            clientName: doc.clientName,
            clientEmail: doc.clientEmail,
            clientStreetAddress: doc.clientStreetAddress,
            clientCity: doc.clientCity,
            clientZipCode: doc.clientZipCode,
            clientCountry: doc.clientCountry,
            invoiceDate: doc.invoiceDate,
            invoiceDateUnix: doc.invoiceDateUnix,
            paymentTerms: doc.paymentTerms,
            paymentDueDateUnix: doc.paymentDueDateUnix,
            paymentDueDate: doc.paymentDueDate,
            productDescription: doc.productDescription,
            invoiceItemList: doc.invoiceItemList,
            invoiceTotal: doc.invoiceTotal,
            invoicePending: doc.invoicePending,
            invoiceDraft: doc.invoiceDraft,
            invoicePaid: doc.invoicePaid,
          };
          // state.invoiceData = [];
          commit('SET_INVOICE_DATA', data);

        })
        commit('INVOICES_LOADED');
      } catch (error) {
        console.log('ERRoR', error);
      }
    }
  },
  modules: {
  }
})
