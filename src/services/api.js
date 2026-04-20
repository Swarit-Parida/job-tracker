import axios from 'axios'

const api = axios.create({ baseURL: 'https://dummyjson.com' })

export async function fetchMockJobs() {
  const { data } = await api.get('/products?limit=10')
  return data.products
}

export default api
