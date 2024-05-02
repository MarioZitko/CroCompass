import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    currentUser: string | null;
    userRole: string | null;  // Handle user role
    login: (user: string, role: string) => void;
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
    const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('role'));

    const login = (user: string, role: string) => {
        localStorage.setItem('user', user);
        localStorage.setItem('role', role);
        setCurrentUser(user);
        setUserRole(role);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        setCurrentUser(null);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
