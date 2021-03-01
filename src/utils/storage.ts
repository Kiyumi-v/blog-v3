import { IStorage } from '@/interface/storage';

const storage = window.sessionStorage;
const getKeyPath: (key: string) => string[] = (key: string) => {
  return key.split('.');
};

const Storage: IStorage<string, () => {}> = {
  set: (key: string, value: any) => {
    const keyPath = getKeyPath(key);
    let storedValue = value;
    // if (Storage.get(key)) {
    //   let obj = {};
    //   keyPath.forEach((key, index) => {
    //     if (index === 0) {
    //       storedValue = Storage.get(key);
    //       obj = Storage.get(key);
    //     } else {
    //       obj = (obj as any)[key];
    //     }
    //     if (index === keyPath.length - 1) {
    //       obj = value;
    //     }
    //   });
    // }
    storage.setItem(keyPath[0], JSON.stringify(storedValue));
  },
  get: (key: string) => {
    const keyPath = getKeyPath(key);
    let storedValue = storage.getItem(keyPath[0]);
    if (storedValue) {
      const obj = JSON.parse(storedValue);
      keyPath.forEach((key, index) => {
        if (index === 0) {
          return;
        }
        storedValue = obj[key];
      });
    }
    return storedValue;
  },
  remove: (key: string) => {
    const keyPath = getKeyPath(key);
    storage.removeItem(keyPath[0]);
  },
  clear: () => {
    storage.clear();
  }
};

export default Storage;
