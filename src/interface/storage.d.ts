export interface IStorage<string, Function> {
  set: (key: string, value: any) => void;
  get: (key: string) => any;
  remove: (key: string) => void;
  clear: () => void;
}
