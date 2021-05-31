interface IUserInfo {
  name: string;
  email: string;
  tel: string;
}

interface IUserContext {
  isLoading: boolean;
  userInfo: undefined;
  userData: IUserInfo | undefined;
  login: (email: string, password: string) => void;
  register: (
    email: string,
    password: string,
    name: string,
    tel: string,
  ) => void;
  getUserInfo: () => void;
  logout: () => void;
}
