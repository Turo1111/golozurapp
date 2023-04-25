import { AsyncStorage } from 'react-native';
import { useEffect, useState } from 'react';

const useLocalStorage = (key) => {
  const [data, setData] = useState(null);

  const saveData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log('Data saved successfully');
    } catch (e) {
      console.log('Failed to save data');
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        const value = JSON.parse(jsonValue);
        console.log('Data retrieved successfully');
        setData(value);
      }
    } catch (e) {
      console.log('Failed to retrieve data');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, saveData };
};

export default useLocalStorage;