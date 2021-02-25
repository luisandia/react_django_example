import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { OpenAPI } from '../ApiGenerated/core/OpenAPI'
import { ApiService } from '../ApiGenerated/services/ApiService'
// import { API } from '../api-service';

function useFetch() {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>()
  const [token] = useCookies(['mr-token'])
  console.log("token ",token)
  if (token) {
    OpenAPI.HEADERS = {
      Authorization: `Token ${token['mr-token']}`,
    }
  } else {
    OpenAPI.HEADERS = {
      Authorization: ``,
    }
  }

  useEffect(() => {
    console.log(OpenAPI)
    async function fetchData() {
      setLoading(true)
      setError('')
      const response = await ApiService.listMovies().catch((err: any) =>
        setError(err),
      )
      setData(response)
      setLoading(false)
    }
    fetchData()
  }, [])
  return [data, loading, error]
}

export { useFetch }
