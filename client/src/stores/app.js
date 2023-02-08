import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
const url = 'http://localhost:3000/'
import axios from 'axios'

export const useAppStore = defineStore('app', {
      state(){
        return{
          isAuth: false,
          products: [],
          mycart:[],
          cartTotalAmount: 0
        }
      },
      actions:{
        checkAuth(){
          this.isAuth = !!localStorage.getItem('access_token')
        },
        async register(form){
          try{
            const { data } = await axios({
              method: 'POST',
              url: `${url}register`,
              data : form
            })
            this.$router.push('/login')
          }
          catch(err){
            console.log(err, "INII");

          }
        },
        
        async login(form){
          try{
            const { data } = await axios({
              method: 'POST',
              url:`${url}login`,
              data:form
            })
            localStorage.setItem('access_token', data.access_token)
            this.isAuth = true
            this.$router.push('/')
          }
          catch(err){
            console.log(err);
          }
        },

        async logout(){
          try{
            localStorage.clear()
            this.checkAuth()
            this.$router.push('/')
          }
          catch(err){
            console.log(err);
          }
        },

        async fetchProducts(){
          try{
            const { data } = await axios({
              methods:'GET',
              url:`${url}products`,
              // headers:{
              //   access_token: localStorage.getItem('access_token')
              // }
            })
            // console.log(data, "INI DATA BRO");
            this.products = data
          }
          catch(err){
            console.log(err);
          }
        },

        async addCart(ProductId, product_api_url){
          try{
            const { data } = await axios({
              method:'POST',
              url:`${url}products/${ProductId}`,
              data:{
                product_api_url
              },
              headers:{
                access_token: localStorage.getItem('access_token')
              }
            })
            Swal.fire({
              icon: 'success',
              title: `Success add to cart`,
              showConfirmButton: false,
              timer: 2000
            })
          }
          catch(err){
            console.log(err);
          }
        },
        async fetchMyCart(){
          try{
            const { data } = await axios({
              method: 'GET',
              url: `${url}products/mycart`,
              headers:{
                access_token: localStorage.getItem('access_token')
              }
            })
            this.mycart = data
          }
          catch(err){
            console.log(err);
          }
        }
      }
      
  })

