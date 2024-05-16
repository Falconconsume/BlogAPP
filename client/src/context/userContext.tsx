import { createContext, useEffect, useState } from "react";

interface IUserContext {
  currentUser: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<IUserContext | null>(null);

const UserProvider = (props: any) => {
  const { children } = props;
  const user: any = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState<string>(JSON.parse(user));

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
