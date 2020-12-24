import { IUser } from '@/interface/user';
import { GetterTree, MutationTree } from 'vuex';

export type IUserState = () => IUser;

export interface IUserGetters<IUser, any> extends GetterTree<IUser, any> {
  isLogin: (state: IUser) => boolean;
  getUserName: (state: IUser) => string;
}

export interface IUserMutations<IUser> extends MutationTree<IUser> {
  setUser: (state: IUser, payload: IUser) => void;
}
