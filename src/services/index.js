import axios from 'axios'

const baseUrl = `${'https://apimoet.dtsgroup.com.vn'}`
const sendRequest = async (api, data, headers, params, ...rest) => {
    const { method, url } = api

    const axiosConfig = {
        method,
        url: `${baseUrl}/${url}`,
        data: data || {},
        headers: headers || {},
        params: params || {},
        ...rest,
    }
    // console.log('axios', axiosConfig)

    try {
        const response = await axios(axiosConfig)

        return response.data
    } catch (error) {
        console.error(`Api error: ${error.message}`)
        throw error
    }
}

export default sendRequest
