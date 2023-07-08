<template>
    <div class="row">
        <div class="col-md-6 login-bg">
            <div class="login-banner"></div>
        </div>
        <div class="col-md-6 login-wrap-bg">
            <div class="login-wrapper">
                <div class="loginbox">
                    <div class="img-logo">
                        <img
                            src="./../assets/img/logoBig.png"
                            class="img-fluid"
                            alt="Logo"
                        />
                    </div>
                    <h3>Đăng nhập</h3>
                    <p class="account-subtitle">
                        Đăng nhập vào tài khoản của bạn để tiếp tục
                    </p>

                    <CustomInput
                        label="Tài khoản"
                        v-model="login.input_username"
                        type="text"
                        error="error"
                    />
                    <CustomInput
                        label="Mật khẩu"
                        v-model="login.input_password"
                        type="password"
                        error="error"
                    />

                    <!-- <div class="form-group">
                        <div class="row">
                            <div class="col-6">
                                <div class="form-remember">
                                    <input
                                        type="checkbox"
                                        name="radio"
                                        v-model="login.input_remember"
                                    />

                                    <label> Ghi nhớ </label>
                                </div>
                            </div>

                            <div
                                class="col-6 text-end"
                                @click="navigateForgotPassword"
                            >
                                <a class="forgot-link" href="">Quên mật khẩu ?</a>
                            </div>
                        </div>
                    </div> -->
                    <div>
                        <CustomButton
                            label="Đăng nhập"
                            @click="handleLogin"
                            size="small"
                            type="primary"
                        />
                    </div>
                    <!-- <div class="dont-have" @click="navigateSignUp">
                        Don't have an account?
                        <a href="">Sign up</a>
                    </div> -->
                    <!-- <div class="login-or">
                        <span class="or-line"></span>
                        <p class="span-or">or login with</p>
                    </div>

                    <div class="social-login">
                        <a href=""
                            ><img
                                src="./../assets/img/icon/google.png"
                                class="img-fluid"
                                alt="Logo"
                        /></a>
                        <a href=""
                            ><img
                                src="./../assets/img/icon/facebook.png"
                                class="img-fluid"
                                alt="Logo"
                        /></a>
                        <a href=""
                            ><img
                                src="./../assets/img/icon/twitter.png"
                                class="img-fluid"
                                alt="Logo"
                        /></a>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import store from '@/store'
import sendRequest from '@/services'
import CustomInput from '../components/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { Router } from '@/constants/Router'
import Api from '@/constants/Api'
export default {
    name: 'loGin',
    components: { CustomInput, CustomButton },
    data() {
        return {
            login: {
                input_username: '',
                input_password: '',
                input_remember: ''
            }
        }
    },
    methods: {
        async handleLogin() {
            try {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                const response = await sendRequest(Api.auth.login, {
                    username: this.login.input_username,
                    password: this.login.input_password
                })

                if (response.rc === 0) {
                    setTimeout(() => {
                        loading.close()
                        this.$router.push('/')
                    }, 1000)
                    store.commit('SET_AUTH_USER', response)
                    store.commit('SET_AUTH_TOKEN', response.token)
                    localStorage.setItem('activeMenu', '/dashboard')
                    localStorage.setItem('activeUI', '/dashboard')
                } else if (response.rc === 1 || response.rc === 27) {
                    setTimeout(() => {
                        loading.close()
                        this.$message({
                            message: response.rd,
                            type: 'error'
                        })
                    }, 1000)
                }
            } catch (error) {
                console.log(error)
            }
        }
        // navigateForgotPassword() {
        //     this.$router.push(Router.auth.forgotpassword)
        // },
        // navigateSignUp() {
        //     this.$router.push(Router.auth.signup)
        // }
    },
    mounted() {}
}
</script>

<style scoped>
.login-bg {
    background-image: url('./../assets/img/login-bg.jpg');
    background-size: cover;
    top: 0;
    left: 0;
    position: fixed;
}
.login-banner {
    min-height: 100vh;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 30px 15px;
}
.login-wrap-bg {
    padding: 0;
    position: absolute;
    right: 0;
}
.login-wrapper {
    width: 100%;
    height: 100vh;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: center;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
}
.login-wrapper .loginbox {
    width: 100%;
    padding: 40px;
    max-width: 530px;
}
.login-wrapper .loginbox .img-logo {
    margin-bottom: 28px;
}
.login-wrapper .loginbox h3 {
    font-size: 28px;
    margin-bottom: 15px;
}
.account-subtitle {
    color: #7e84a3;
    font-size: 16px;
    margin-bottom: 30px;
}
.login-wrapper .loginbox label {
    width: 100%;
}
.forgot-link {
    color: #0ce0ff;
    float: right;
}
.login-wrapper .loginbox .dont-have {
    margin: 25px 0 0;
    text-align: center;
}
.login-wrapper .loginbox .dont-have a {
    color: #0ce0ff;
}
.login-wrapper .loginbox .dont-have a:hover {
    text-decoration: underline;
}
.social-login {
    display: flex;
    display: -ms-flexbox;
    justify-content: center;
}
.social-login > a {
    background-color: #fff;
    border: 2px solid #e6e9f4;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 98px;
    height: 51px;
    margin-right: 30px;
}
.social-login > a:last-child {
    margin-right: 0;
}
.social-login > a:hover {
    opacity: 0.8;
    background: #e1f6ff;
}
.login-or {
    margin: 30px 0;
    text-align: center;
}
.login-or {
    color: #757575;
    margin: 17px 0 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    position: relative;
}
.or-line {
    background-color: #e5e5e5;
    height: 1px;
    margin-bottom: 0;
    margin-top: 0;
    display: block;
}
.span-or {
    background-color: #fff;
    display: block;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    text-align: center;
    top: -3px;
    font-size: 16px;
    padding: 0 15px;
    color: #7e84a3;
}
.email-confirm {
    text-align: center;
}
.loginbox.email-confirm h3 {
    margin-bottom: 30px;
}
.loginbox.email-confirm p {
    margin-bottom: 30px;
}
.email-confirm .success-icon {
    margin-bottom: 20px;
}
.email-confirm .success-icon i {
    font-size: 69px;
    color: #17d053;
}
.email-confirm .btn {
    min-width: 200px;
}
.form-remember {
    display: flex;
    align-items: center;
}
.form-remember input {
    width: 15px;
    height: 15px;
}
.form-remember label {
    margin-bottom: 3px;
    margin-left: 10px;
}

.layout-btn {
    background-color: #0ce0ff;
    border: 1px solid #0ce0ff;
}
.layout-btn .btn {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.layout-btn .btn button {
    color: #fff;
    border: none;
    background: none;
}
</style>
