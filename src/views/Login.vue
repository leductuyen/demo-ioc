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
                    <div class="captcha" v-if="failCount >= 5">
                        <div>
                            <CustomInput
                                label="Nhập mã Captcha"
                                type="text"
                                error="error"
                                v-model="login.input_captcha"
                            />
                        </div>
                        <div>
                            <img :src="base64Image" alt="" />
                        </div>
                    </div>
                    <div style="margin-top: 30px">
                        <button
                            size="small"
                            type="button"
                            class="btn btn-info btn-block"
                            @click="handleLogin"
                        >
                            Đăng nhập
                        </button>
                        <button
                            size="small"
                            type="button"
                            class="btn btn-primary btn-block"
                            @click="handleLoginSSO"
                        >
                            Đăng nhập SSO
                        </button>
                    </div>
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
    components: {
        CustomInput
    },
    data() {
        return {
            login: {
                input_username: '',
                input_password: '',
                input_remember: '',
                input_captcha: '',
                captchaToken: ''
            },
            token: '',
            base64Image: '',
            failCount: 0
        }
    },
    methods: {
        async getMaCaptCha() {
            const token = {
                token: this.token
            }
            const response = await sendRequest(Api.auth.getMaCaptCha, null, token)
            this.base64Image = 'data:image/png;base64,' + response.dataImg
            this.captchaToken = response.tokenCap
        },
        async handleLogin() {
            try {
                const requestData = {
                    username: this.login.input_username,
                    password: this.login.input_password,

                    captcha_token: this.captchaToken
                }
                if (this.login.input_captcha) {
                    requestData.captcha = this.login.input_captcha
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading ...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                const response = await sendRequest(Api.auth.login, requestData)

                if (response.rc === 0) {
                    setTimeout(() => {
                        loading.close()
                        this.$router.push('/')
                    }, 1000)
                    this.token = response.token
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
                if (response.rc !== 0 && response.failCount >= 5) {
                    loading.close()
                    this.$message({
                        message: response.rd,
                        type: 'error'
                    })
                    this.getMaCaptCha()
                    this.failCount = response.failCount
                }
            } catch (error) {
                console.log(error)
            }
        },
        generateString(length) {
            let characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let result = ''
            const charactersLength = characters.length
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                )
            }
            return result
        },
        objectToQueryString(obj) {
            let str = []
            for (let p in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, p)) {
                    str.push(p + '=' + obj[p])
                }
            }
            return str.join('&')
        },
        async handleLoginSSO() {
            const response = await sendRequest(Api.auth.loginSSo)
            const redirect_uri = '/login'
            const postLogoutRedirectUri = ''
            let params = {
                response_type: 'code',
                Issuer: `https://id.nentanggiaoduc.edu.vn`,
                redirect_uri: redirect_uri,
                postLogoutRedirectUri: postLogoutRedirectUri,
                client_id: 'csdln_client',
                state: this.generateString(5),
                scope: 'openid profile offline_access esmartup',
                code_challenge: response.code_challenge,
                code_challenge_method: 'S256'
            }
            let query = this.objectToQueryString(params)
            console.log('query', query)
            let urlLogin =
                'https://id.nentanggiaoduc.edu.vn/connect/authorize?' + query
            console.log('url', urlLogin)
            window.location.href = urlLogin
        }
    },
    mounted() {}
}
</script>

<style scoped>
.login-bg {
    background-image: url('https://dongbo.csdl.edu.vn/images/hinhnen.jpg');
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
    border-radius: 10px;
    border: 1px solid silver;
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
.captcha {
    display: flex;
    align-items: center;
}
.captcha img {
    height: 40px;
    width: 100%;
    margin-top: 15px;
}
</style>
