<template>
    <div>
        <h1>ghjkhj</h1>
    </div>
</template>
<script>
import Api from '@/constants/Api'
import sendRequest from '@/services'
import axios from 'axios'

export default {
    name: 'LoginSSO',
    components: {},
    data() {
        return {
            login: {}
        }
    },

    async mounted() {
        // Lấy code từ url -> gọi api lấy thông tin.
        const response = await sendRequest(Api.auth.loginSSo)
        console.log(response)
        // console.log('mounted login sso...')
        // console.log(this.$route.query.code)
        const baseUrl = 'https://id.nentanggiaoduc.edu.vn/connect/token'

        const header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        let form_params = {
            redirect_uri: `${`https://csdl.dtsgroup.com.vn`}${'/sso/login.html'}`,
            grant_type: 'authorization_code',
            code_verifier: response.code_verifier,
            client_id: 'csdln_client',
            code: this.$route.query.code
        }
        axios
            .post(baseUrl, form_params, { headers: header })
            .then((response) => {
                // Xử lý phản hồi từ server nếu cần
                console.log('Phản hồi từ server:', response.data)
                console.log(response.data)
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi gọi API:', error)
            })
    },
    methods: {}
}
</script>
