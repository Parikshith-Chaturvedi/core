export interface User {
    id: string;
    username: string;
    role: 'admin' | 'user';
    email: string;
}

export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthorized: (role: 'admin' | 'user') => boolean;
    loading: boolean;
  }
  