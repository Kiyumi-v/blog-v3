import {IUser} from "@/interface/user";
import {IUserState, IUserMutations, IUserGetters} from "@/interface/userStore";
import {IRoot} from "@/interface/root";

const state: IUserState = () => {
  return {
    userName: '',
    userId: ''
  }
}

const getters: IUserGetters<IUser, IRoot> = {
  isLogin: (state, root) => !!state.userId,
  getUserName: (state, root) => state.userName
}

const mutations: IUserMutations<IUser> = {
  setUser(state, user) {
    const {userName, userId} = user;
    state.userName = userName;
    state.userId = userId;
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations
}
