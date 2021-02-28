import AsyncStorage from '@react-native-community/async-storage';
import { useEffect, useState } from 'react';
import { OpenAPI } from '../Generated/core/OpenAPI';
import { ApiService } from '../Generated/services/ApiService';

function useFetch() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem('MR_Token');

      if (token) {
        OpenAPI.HEADERS = {
          Authorization: `Token ${token}`,
        };
      }
      setLoading(true);
      setError('');
      try {
        const response = await ApiService.listMovies();
        setData(response);
        setLoading(false);
      } catch (err: any) {
        setError(err);
      }
    }
    fetchData();
  }, []);
  return [data, loading, error];
}

export { useFetch };
