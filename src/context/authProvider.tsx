import { createContext, useState } from "react";

type AuthData = {
  accessToken: string | null;
  role: string[] | null;
};

export interface AuthContextType {
  authUser: AuthData;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthData>>;
}

const defaultAuthUser: AuthData = {
  accessToken: null,
  role: [],
};

const defaultSetAuthUser: React.Dispatch<
  React.SetStateAction<AuthData>
> = () => {};

const AuthContext = createContext<AuthContextType>({
  authUser: defaultAuthUser,
  setAuthUser: defaultSetAuthUser,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthData>(defaultAuthUser);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
