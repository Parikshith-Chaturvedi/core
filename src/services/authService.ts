import { User } from '@/types/auth';

class AuthService {
  private static instance: AuthService;
  private readonly STORAGE_KEY = 'music_library_auth';

  private readonly users = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin' as const,
      password: 'admin123',
    },
    {
      id: '2',
      username: 'user',
      email: 'user@example.com',
      role: 'user' as const,
      password: 'user123',
    },
  ];

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(username: string, password: string): Promise<User | null> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = this.users.find(
        u => u.username === username && u.password === password
      );

      if (!user) return null;

      // Don't include password in the returned user object
      const { password: _, ...userWithoutPassword } = user;
      this.setCurrentUser(userWithoutPassword);
      return userWithoutPassword;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }

  public logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  public getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem(this.STORAGE_KEY);
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  public isAuthorized(user: User | null, requiredRole: 'admin' | 'user'): boolean {
    if (!user) return false;
    if (requiredRole === 'user') return true;
    return user.role === 'admin';
  }
}

export const authService = AuthService.getInstance();