import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  // data
  state: () => ({
    count: 0,
    users: [],
    jobs: [],
    authentication: false,
    toast: false,
  }),

  // methods
  actions: {
     SET_STATE(props) {
      if( typeof props.stateName === 'string' ) {
          this[props.stateName] = props.value
          this.targetState = this[props.stateName]
      } else {
          console.warn("Cannot set state with a payload.prop that isn't a string or an array of strings");
      }
    },

    SET_AUTHENTICATION(value) {
      sessionStorage.setItem('authentication', JSON.stringify(value)) 
      sessionStorage.setItem('user', JSON.stringify(value)) 
    },

    // Fetch Users
    async fetchUsers() {
      try {
        const response = await fetch('/api/users') // const response = await fetch('http://localhost:5000/users')
        const data = await response.json()
        this.users = data
      } catch (error) {
        console.error('Error fetching users list', error);
      }
    },

    // Add User
    async addUser(user) {
      this.users.push(user)
    
      const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { 'Content-Type': 'application/json' }
      })

      setTimeout(() => { this.setToast({ type: 'success', message: `User ${user.firstName} has been added!` }) }, 100);
      
      if (response.error) {
        console.log(response.error)
        setTimeout(() => { this.setToast({ type: 'success' }) }, 100);
      }
    },

    setToast(toast) {
      this.toast = toast
      setTimeout(() => {this.toast = false}, 3000);
    },


    // Fetch Jobs
    async fetchJobs() {
      try {
        const response = await fetch('/api/jobs') // const response = await fetch('http://localhost:5000/jobs')
        const data = await response.json()
        this.jobs = data
      } catch (error) {
        console.error('Error fetching jobs list', error);
      }
    },
    

  },

  // computed
  getters: {
    doubleCount: (state) => {
      return state.count * 2
    },

    getAuthentication: (state) => {
      return state.authentication = JSON.parse( sessionStorage.getItem('authentication') );
    },
    
    getUser: (state) => {
      return state.authentication = JSON.parse( sessionStorage.getItem('authentication') );
    }
  }
})