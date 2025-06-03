<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/stores/index.js';

const router = useRouter()
const store = useStore()

const userId = store.getUser.user.id
const title = ref('')
const type = ref('Full-Time')
const description = ref('')
const salary = ref('')
const location = ref('Knasas City, KS')
const company = ref({
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
})

const error = ref({ 
    active: false, 
    field: {
        title: '',
        description: ''
    },
})

const onSubmit = () => {
    const data = {
        id: Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        userId: userId,
        title: title.value,
        description: description.value,

        // title: title.value,
        // type: type.value,
        // description: description.value,
        // location: location.value,
        // salary: salary.value,
        // company: {
        //     name: company.value.name,
        //     description: company.value.description,
        //     contactEmail: company.value.contactEmail,
        //     contactPhone: company.value.contactPhone,
        // },
    }

    if( title.value && description.value ){
        console.log('onSubmit', data)
        store.addJob(data)
        setTimeout(() => {  store.setToast({type: 'success', title: '', message: ``}) }, 100);
        router.push('/')
    } else {
        errorValidation()
    }
}

const errorValidation = () => {
    error.value.active = true

    // email
    if ( !title.value ) {
        error.value.field.title = 'Please enter title'
    } else {
        error.value.field.title = ''
    }

    // password
    if ( !description.value ) {
        error.value.field.description = 'Please enter description'
    } else {
        error.value.field.description = ''
    }

    setTimeout(() => {error.value.active = false}, 3000);
}

</script>

<template>
    <section>
        <div class="container mx-auto py-4">
            
            <form @submit.prevent="handleSubmit" class="form">
                <div class="form-container">
                    <div class="form-header">
                        <h2 class="sub-title fw-700 mb-1">New job form:</h2>
                    </div>

                    <div class="form-body">

                        <div class="form-control">
                            <label>Job Listing Name:</label>
                            <input 
                                type="text"
                                id="title"
                                placeholder="Job title"
                                v-model="title"
                            />
                            <span v-if="error.active && error.field.title" class="error-output">{{ error.field.title }}</span>
                        </div>
                        
                        <!-- <div class="form-control">
                            <label>Job Type:</label>
                            <select
                                v-model="type"
                                id="type"
                                name="type"
                            >
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship">Internship</option>
                            </select>
                            <span v-if="error.active" class="error-output">{{ error.message }}</span>
                        </div> -->

                        <div class="form-control">
                            <label>Job Listing Name:</label>
                            <textarea
                                id="description"
                                v-model="description"
                                name="description"
                                class=""
                                rows="4"
                                placeholder="Add any job duties, expectations, requirements, etc"
                            ></textarea>
                            <span v-if="error.active && error.field.description" class="error-output">{{ error.field.description }}</span>
                        </div>

                        <!-- <div class="form-control">
                            <label>Salary:</label>
                            <select
                                v-model="salary"
                                id="salary"
                                name="salary"
                            >
                                <option value="Under $50K">under $50K</option>
                                <option value="$50K - $60K">$50 - $60K</option>
                                <option value="$60K - $70K">$60 - $70K</option>
                                <option value="$70K - $80K">$70 - $80K</option>
                                <option value="$80K - $90K">$80 - $90K</option>
                                <option value="$90K - $100K">$90 - $100K</option>
                                <option value="$100K - $125K">$100 - $125K</option>
                                <option value="$125K - $150K">$125 - $150K</option>
                                <option value="$150K - $175K">$150 - $175K</option>
                                <option value="$175K - $200K">$175 - $200K</option>
                                <option value="Over $200K">Over $200K</option>
                            </select>
                            <span v-if="error.active" class="error-output">{{ error.message }}</span>
                        </div> -->

                        <!-- <div class="form-control">
                            <label>Location:</label>
                            <select
                                v-model="location"
                                id="location"
                                name="location"
                            >
                                <option value="Boston, MA">Boston, MA</option>
                                <option value="Miami, FL">Miami, FL</option>
                                <option value="Knasas City, KS">Knasas City, KS</option>
                                <option value="Brooklyn, NY">Brooklyn, NY</option>
                                <option value="Pheonix, AZ">Pheonix, AZ</option>
                                <option value="Atlanta, GA">Atlanta, GA</option>
                                <option value="Portland, OR">Portland, OR</option>
                            </select>
                            <span v-if="error.active" class="error-output">{{ error.message }}</span>
                        </div> -->

                        <!-- 
                        <h3 class="para fw-700 mb-0-5">Company Info:</h3>
                        <hr class="mb-1"/>

                        <div class="form-control">
                            <label>Company Name:</label>
                            <input 
                                type="text"
                                id="company"
                                name="company"
                                placeholder="Company Name"
                                v-model="company.name"
                            />
                        </div>

                        <div class="form-control">
                            <label>Company Description:</label>
                            <textarea
                                id="company_description"
                                placeholder="What does your company do?"
                                v-model="description.description"
                                name="company_description"
                                rows="4"
                                class=""
                            ></textarea>
                        </div>

                        <div class="form-control">
                            <label>Contact Email:</label>
                            <input 
                                type="email"
                                id="contact_email"
                                name="contact_email"
                                placeholder="Email address for applicants"
                                v-model="company.contactEmail"
                            />
                        </div>

                        <div class="form-control">
                            <label>Contact Phone:</label>
                            <input 
                                type="tel"
                                id="contact_phone"
                                name="contact_phone"
                                placeholder="Optional phone for applicants"
                                v-model="company.contactPhone"
                            />
                        </div>
                        -->

                    </div>

                    <div class="form-footer">
                        <div class="form-control">
                            <button @click="onSubmit" type="submit" class="btn btn-primary">Add Job</button>
                        </div>
                    </div>
                </div>
            </form>
            
        </div>
    </section>
</template>

<style lang="scss" scoped>
.form{
    &-container{
        width: min(100%, 512px);
        margin-inline: auto;
        background-color: var(--background);
        
        padding: 20px;
        border-radius: 10px;
    }
    &-header{ }
    &-body{
        .error-output{
            position: relative;
            top: 4px;
            font-size: 12px;
            color: #D32F2F;
        }
    }
    &-control{
        position: relative;
        margin-bottom: 20px;

        &:last-child{ margin-bottom: 40px; }

        label{
            display: block;
            font-size: 14px;
            font-weight: 600;
            line-height: 1.0;
            margin-bottom: 6px;
            padding-left: 0px;
        }

        input,
        select,
        textarea{
            display: block;
            width: min(100%, 768px);
            min-height: 40px;
            padding: 6px 12px;
            border: solid 1px rgba(#000, 0.125);
            border-radius: 4px;
            outline: none;
            font-family: inherit;
        }

        select{
            padding-left: 4px;
        }

        textarea{
            padding: 6px 6px;
            resize: none;
        }

        .btn{
            // width: 100%;
            height: 40px;
            padding-inline: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            background-color: rgba(#0070d9, 1.0);
            border-radius: 4px;
            cursor: pointer;

            &:hover{
                background-color: rgba(#0070d9, 0.8);
            }
        }
    } 

    &-footer{
        .form-control{ margin-bottom: 10px; }
    }

    hr{
        height: 1px;
        border: none;
        background-color: rgba(#5d5d5d, 0.125);
    }
}
</style>