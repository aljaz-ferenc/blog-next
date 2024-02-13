import {createClient} from '@sanity/client'

export default createClient({
    projectId: '08u4o3l9',
    dataset: 'production',
    apiVersion: '2021-08-31',
    useCdn: true
})