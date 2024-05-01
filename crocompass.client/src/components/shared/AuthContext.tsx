import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    currentUser: string | null;
    login: (user: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<string | null>(localStorage.getItem('user'));

    const login = (user: string) => {
        localStorage.setItem('user', user);
        setCurrentUser(user);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
