import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageContext = createContext();

export const useAsyncStorage = () => {
  return useContext(AsyncStorageContext);
};

export const AsyncStorageProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const saveData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('venta', jsonValue);
      console.log('Data saved successfully');
      setData(value);
    } catch (e) {
      console.log('Failed to save data');
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('venta');
      if (jsonValue !== null) {
        const value = JSON.parse(jsonValue);
        console.log('Data retrieved successfully');
        setData(value);
        return value
      }
    } catch (e) {
      console.log('Failed to retrieve data');
      return []
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('venta');
      setData(undefined);
      console.log('Data cleared successfully');
    } catch (e) {
      console.log('Failed to clear data');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AsyncStorageContext.Provider value={{ data, saveData, clearData }}>
      {children}
    </AsyncStorageContext.Provider>
  );
};