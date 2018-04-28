
<template>
  <div class="">
<h4>{{ account.address }} : : {{ account.role }} : : {{ account.balance }}</h4>
<br>
<a href="#" v-if="isLoggedIn" @click="logout">Logout</a>
<br>
<h4> {{ accounts }}</h4>
  </div>
</template>


<script>
export default {
  // probs: ['address'],
  data() {
    return {
      account: {
        address: null,
        role: '',
        balance: ''
      },
      accounts: null
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logOut')
      .then(() => {
        this.$router.replace('/')
      })
    }
  },
  computed: {
    isLoggedIn() {
      console.log(this.$store.getters.isLoggedIn)
      return this.$store.getters.isLoggedIn
    }
  },
  created(){
      if(this.$Hospital.accounts() == null){
        this.$store.dispatch('logOut')
        .then(() => {
          this.$router.replace('/')
        })
      }
      this.accounts = this.$Hospital.accounts()
      this.account = this.$store.state.primaryAccount
  }
}
</script>