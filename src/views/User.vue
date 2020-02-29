<template>
    <div>
        <mt-header fixed title="用戶"></mt-header>
        <div class="content" v-if="!checkLogin">
            <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
            <mt-button class="btn" type="primary" size="large" @click="login">登入</mt-button>
        </div>
        <div class="content" v-else>
            <h1>你好,{{$store.state.user.username}}</h1>
            <mt-button class="btn" type="danger" size="large" @click="logout">登出</mt-button>

        </div>

    </div>
</template>

<script>

    import {LOGOUT} from "../store/mutation-types";

    export default {
        name: "User",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                const username = this.username
                const password = this.password
                this.$store.dispatch('login', {username, password}).then((msg) => {
                    this.$toast(msg)
                    this.username = ''
                    this.password = ''
                    this.$router.push("/home");
                })
            },
            logout() {
                this.$store.commit(LOGOUT)
            },
        },
        computed: {
            checkLogin() {

                if (this.$store.state.user.token) {

                    return true
                }
                return false
            }
        }

    }
</script>

<style scoped>
    .content {
        margin-top: 40px;
    }

    .btn {
        margin-top: 20px;
    }
</style>
