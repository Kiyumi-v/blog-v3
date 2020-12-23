import {IUser} from "@/interface/user";
import {IRoot} from "@/interface/root";

export type IUserState = () => IUser;

export interface IUserGetters<IUser, IRoot> {
  isLogin: (state: IUser, root?: IRoot) => boolean,
  getUserName: (state: IUser, root?: IRoot) => string
}

export interface IUserMutations<IUser> {
  setUser: (state: IUser, payload: IUser) => void
}
