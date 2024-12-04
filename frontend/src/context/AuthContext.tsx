import { FC, ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext.ts';

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [jwt, setJwt] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedJwt = localStorage.getItem('jwt');
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    if (storedJwt && storedUsername && storedRole) {
      setJwt(storedJwt);
      setUsername(storedUsername);
      setRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, jwt, setJwt, username, setUsername, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
