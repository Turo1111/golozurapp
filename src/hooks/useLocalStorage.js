import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const useLocalStorage = (initialValue, key) => {
  const [data, setData] = useState(initialValue);

  const saveData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      setData(value);
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
        setData(value);
        console.log('Data retrieved successfully');
      }
    } catch (e) {
      console.log('Failed to retrieve data');
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setData(initialValue);
      console.log('Data cleared successfully');
    } catch (e) {
      console.log('Failed to clear data');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, saveData, clearData, getData };
};

export default useLocalStorage;