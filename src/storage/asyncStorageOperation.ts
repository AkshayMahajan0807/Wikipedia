import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageOperation {
  async setAsyncStorageItem(key: string, value: any) {
    try {
      value = JSON.stringify(value);
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('error set async storage item', error);
    }
  }

  async getAsyncStorageItem(key: string) {
    let response = null;
    try {
      response = await AsyncStorage.getItem(key);
      response = response && JSON.parse(response);
    } catch (error) {
      console.error('error get', error);
    }
    return response;
  }
}

export const storage = new AsyncStorageOperation();
