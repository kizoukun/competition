<template>
    <div>
        Hello World
        <p v-if="error" class="bg-red-500 p-2 text-white font-md">{{ error }}</p>
        <form @submit.prevent="login">
            <input type="email" v-model="form.email" />
            <input type="password" v-model="form.password" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                error: null
            }
        },
        methods: {
            async login() {
                this.error = null;
                fetch('http://localhost:3000/api/v1/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.form)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.error(error);
                    this.error = error.message;
                })
            }
        }
    }
</script>