import { IUser } from '@/interface/user';
import { IUserState, IUserMutations, IUserGetters } from '@/interface/userStore';
import Storage from '@/utils/storage';

const state: IUserState = () => {
  return {
    userName: Storage.get('user.userName') || '',
    userId: Storage.get('user.userId') || ''
  };
};

const getters: IUserGetters<IUser, any> = {
  isLogin: (state: IUser) => !!state.userId,
  getUserName: (state: IUser) => state.userName
};

const mutations: IUserMutations<IUser> = {
  setUser(state: IUser, user: IUser) {
    const { userName, userId } = user;
    state.userName = userName;
    state.userId = userId;
    Storage.set('user', { userName, userId });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations
};
