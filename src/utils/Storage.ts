import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  LANG: 'LANG',
};

export const storeData = async (key: string, value: Object): Promise<void> => {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
  } catch (error) {
    console.log(`Error saving data async storage: ${error}`);
  }
};

export async function getData(key: string): Promise<string | null> {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Error getting data from async storage: ${error}`);
    return null;
  }
}
