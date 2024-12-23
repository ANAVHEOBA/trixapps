import { Platform } from 'react-native';

class StorageUtil {
  private static instance: StorageUtil;
  private storage: any;

  private constructor() {
    if (Platform.OS === 'web') {
      this.storage = {
        getItem: (key: string) => localStorage.getItem(key),
        setItem: (key: string, value: string) => localStorage.setItem(key, value),
        removeItem: (key: string) => localStorage.removeItem(key),
      };
    } else {
      // Lazy load AsyncStorage for native platforms
      this.storage = require('@react-native-async-storage/async-storage').default;
    }
  }

  public static getInstance(): StorageUtil {
    if (!StorageUtil.instance) {
      StorageUtil.instance = new StorageUtil();
    }
    return StorageUtil.instance;
  }

  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await this.storage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  }

  async getItem(key: string): Promise<any> {
    try {
      const jsonValue = await this.storage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Storage getItem error:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.storage.removeItem(key);
    } catch (error) {
      console.error('Storage removeItem error:', error);
    }
  }
}

export default StorageUtil.getInstance();