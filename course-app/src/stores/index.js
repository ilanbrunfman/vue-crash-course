import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  // data
  state: () => ({
    count: 0,
    archive: [],
    users: [],
    userFollowers: [],
    jobs: [],
    authentication: JSON.parse(sessionStorage.getItem('authentication')) || null,
    // authentication: false,
    toast: false,
    activeModal: false,
    modals: [],
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

    ADD_MODAL(state) {
        this.modals.push(state)
        this.activeModal = true
    }, 

    REMOVE_MODAL(state){
        this.activeModal = false
        setTimeout( () => {
            this.modals.pop()
        }, 10);
    },

    SET_AUTHENTICATION(value) {
      sessionStorage.setItem('authentication', JSON.stringify(value)) 
      sessionStorage.setItem('user', JSON.stringify(value)) 
    },

    setToast(toast) {
      this.toast = toast
      setTimeout(() => {this.toast = false}, 3000);
    },

    // Add Archive
    async addArchive(data) {

      // 1. add data to archive array
      try {
        const response = await fetch('/api/archive'  , {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) {
          // Server returned an error status
          const errorData = await response.json()
          console.error('API error:', errorData)

          setTimeout(() => {
            this.setToast({ type: 'error', message: errorData.message || 'Something went wrong' })
          }, 100)
        } else {
          console.log('Add object to archive successfully', data)
        }
      } catch (error) {
        console.error('Fetch failed:', error)

        setTimeout(() => {
          this.setToast({ type: 'error', message: 'Network error while saving archive' })
        }, 100)
      }
    },

    // Fetch Archive
    // Add Archive Users
    async addArchiveUsers(log) {
      this.archive.push(log)

      try {
        const response = await fetch('/api/archiveUsers', {
          method: 'POST',
          body: JSON.stringify(log),
          headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
          // Server returned an error status
          const errorData = await response.json()
          console.error('API error:', errorData)

          setTimeout(() => {
            this.setToast({ type: 'error', message: errorData.message || 'Something went wrong' })
          }, 100)
        } else {
          console.log('Archive added successfully')
        }
      } catch (err) {
        // Network error, timeout, etc.
        console.error('Fetch failed:', err)

        setTimeout(() => {
          this.setToast({ type: 'error', message: 'Network error while saving archive' })
        }, 100)
      }
    },

    // Add Archive Jobs
    async addArchiveJobs(log) {
      // this.archive.push(log)

      try {
        const response = await fetch('/api/archiveJobs', {
          method: 'POST',
          body: JSON.stringify(log),
          headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
          // Server returned an error status
          const errorData = await response.json()
          console.error('API error:', errorData)

          setTimeout(() => {
            this.setToast({ type: 'error', message: errorData.message || 'Something went wrong' })
          }, 100)
        } else {
          console.log('Archive added successfully')
        }
      } catch (err) {
        // Network error, timeout, etc.
        console.error('Fetch failed:', err)

        setTimeout(() => {
          this.setToast({ type: 'error', message: 'Network error while saving archive' })
        }, 100)
      }
    },

    // Fetch Users
    async fetchUsers() {
      try {
        const response = await fetch('/api/users') // const response = await fetch('http://localhost:5000/users')
        const data = await response.json()
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
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
        setTimeout(() => { this.setToast({ type: 'error' }) }, 100);
      }
    },

    // Delete User
    async deleteUser(data) {
      // 
      console.log('deleteUser', data)
      
      // 1.0 add user to archive
      this.addArchive(data)

      const currentUser = this.users.find(user => user.id === data.id)
      console.log('currentUser', currentUser)

      // 1.1 add job associate to user to archive
      this.jobs
        .filter(job => job.userId === data.id)
        .map(job => {
          const jobData = {
            type: 'job',
            active: false,
            authorId: job.userId,
            ...job
          }
          delete job.userId;
          this.deleteJob(jobData)
        })

      // 2.0 delete user from users
      this.users = this.users.filter((user) => user.id !== data.id)
      try {
        const response = await fetch('/api/users/' + data.id, {
            method: 'DELETE'
        })
        if (!response.ok) {
          // Server returned an error status
          const errorData = await response.json()
          console.error('API error:', errorData)

          setTimeout(() => {
            this.setToast({ type: 'error', message: errorData.message || 'Something went wrong' })
          }, 100)
        } else {
          console.log('User has been deleted successfully', data)
        }
      } catch (error) {
        console.error('Fetch failed:', error)

        setTimeout(() => {
          this.setToast({ type: 'error', message: 'Network error while saving archive' })
        }, 100)
      }
    },

    // Update User
    async updateUser(data) {
      console.log('updateUser', data)
      this.users.map((user) => {
          if (user.id === data.id) {
              user.username = data.username
              user.firstName = data.firstName
              user.lastName = data.lastName
              user.email = data.email
              user.password = data.password
              user.type = data.type
          }
      })
      
      try {
        const response = await fetch(`/api/users/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
          // Server returned an error status
          const errorData = await response.json()
          console.error('API error:', errorData)

          setTimeout(() => {
            this.setToast({ type: 'error', message: errorData.message || 'Something went wrong' })
          }, 100)
        } else {
          console.log('Update user successfully')
        }
      } catch (err) {
        // Network error, timeout, etc.
        console.error('Fetch failed:', err)

        setTimeout(() => {
          this.setToast({ type: 'error', message: 'Network error while saving users' })
        }, 100)
      }
    },

    // Update follower in user
    async followUser(email) {
      console.log('followUser', email)
      const auth = this.authentication
      if (!auth || !auth.user) return

      // 1. Add email if not already followed
      if (!auth.user.following.includes(email)) {
        auth.user.following.push(email)

        // 2. Update this.authentication and session
        this.authentication = auth
        sessionStorage.setItem('authentication', JSON.stringify(auth))

        // 3. Find current user in store.users
        const userIndex = this.users.findIndex(u => u.id === auth.user.id)
        if (userIndex !== -1) {
          this.users[userIndex].following = auth.user.following

          // 4. Send PUT request to backend
          try {
            const response = await fetch(`/api/users/${auth.user.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(this.users[userIndex]),
            })

            if (!response.ok) {
              const error = await response.json()
              console.error('Failed to update:', error)
            } else {
              console.log('User follow list updated on server.')
            }
          } catch (err) {
            console.error('Network error updating follow list:', err)
          }
        }
      }


    },

    // Update unfollower in user
    async unfollowUser(email) {
      console.log('unfollowUser', email)
      const auth = this.authentication
      if (!auth || !auth.user) return

      // 1. Remove email from following
      auth.user.following = auth.user.following.filter(e => e !== email)

      // 2. Update local session
      this.authentication = auth
      sessionStorage.setItem('authentication', JSON.stringify(auth))

      // 3. Update users array and backend
      const userIndex = this.users.findIndex(u => u.id === auth.user.id)
      if (userIndex !== -1) {
        this.users[userIndex].following = auth.user.following

        try {
          const response = await fetch(`/api/users/${auth.user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.users[userIndex]),
          })

          if (!response.ok) {
            const error = await response.json()
            console.error('Failed to update:', error)
          } else {
            console.log('User unfollow list updated on server.')
          }
        } catch (err) {
          console.error('Network error updating unfollow list:', err)
        }
      }
    },

    // Fetch User Followers
    async fetchUserFollowers() {
      try {
        const response = await fetch('/api/users') // const response = await fetch('http://localhost:5000/users')
        const data = await response.json()
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        this.userFollowers = data
      } catch (error) {
        console.error('Error fetching users list', error);
      }
    },

    // Fetch Jobs
    async fetchJobs() {
      try {
        const response = await fetch('/api/jobs') // const response = await fetch('http://localhost:5000/jobs')
        const data = await response.json()
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        this.jobs = data
      } catch (error) {
        console.error('Error fetching jobs list', error);
      }
    },

    // Add Job
    async addJob(job) {
      console.log('addJob', job)
      this.jobs.push(job)
    
      try {
        const response = await fetch('/api/jobs', {
          method: 'POST',
          body: JSON.stringify(job),
          headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) {
          // Server returned an error status
          const errorData = await response.json()
          console.error('API error:', errorData)

          setTimeout(() => {
            this.setToast({ type: 'error', message: errorData.message || 'Something went wrong' })
          }, 100)
        } else {
          console.log('Update user successfully')
          setTimeout(() => { this.setToast({ type: 'success', message: `Added job successfully` }) }, 100);
        }
      } catch (error) {
        // Network error, timeout, etc.
        console.error('Fetch failed:', err)

        setTimeout(() => {
          this.setToast({ type: 'error', message: 'Network error while saving users' })
        }, 100)
      }
    },

    // deleteJob
    async deleteJob(job) {    
      
      const data = {
          type: 'job',
          active: false,
          authorId: job.userId,
          ...job,
      }
      delete data.userId;
      // 1. add job to archive
      this.addArchive(data)

      // 2. remove job from jobs
      this.jobs = this.jobs.filter((job) => job.id !== data.id)
      try {
        const response = await fetch('/api/jobs/' + data.id, {
            method: 'DELETE'
        })
        if (!response.ok) {
          // Server returned an error status
          const errorData = await response.json()
          console.error('API error:', errorData)

          setTimeout(() => {
            this.setToast({ type: 'error', message: errorData.message || 'Something went wrong' })
          }, 100)
        } else {
          console.log('Job has been deleted successfully', data)
        }
      } catch (error) {
        console.error('Fetch failed:', error)

        setTimeout(() => {
          this.setToast({ type: 'error', message: 'Network error while saving archive' })
        }, 100)
      }
    },

    // Update Job
    async updateJob(data) {
      console.log('updateJob', data)
      this.jobs.map((job) => {
          if (job.id === data.id) {
            job.id = data.id
            job.userId = data.userId
            job.title = data.title
            job.description = data.description
          }
      })
      console.log('updated job', this.jobs)

      try {
        const response = await fetch(`/api/jobs/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        } else {
          this.setToast({type: 'success', title: 'Success!', message: `Updated job successfully`})
        }
      } catch (error) {
        console.error('Update user function', error);
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
    },

    getUserFollowers(state){
        const auth = JSON.parse(sessionStorage.getItem('authentication'))
        if (!auth || !auth.user) return [];

        return state.users.filter((user) =>
          user.email !== auth.user.email &&
          !auth.user.following.includes(user.email)
        );
    }
  }
})