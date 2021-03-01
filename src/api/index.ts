import { ILogin } from '@/interface/login';

export function login(params: ILogin) {
  console.log(params);
  return Promise.resolve({
    code: 0,
    data: 'success',
    msg: 'success'
  });
}
