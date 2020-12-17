/* eslint-disable import/no-anonymous-default-export */
import Axios from 'axios'

export default {
    get: async (url) => {
        const promiseResult = await Axios.get(url)
        return promiseResult ? promiseResult.data : []
    },
}
