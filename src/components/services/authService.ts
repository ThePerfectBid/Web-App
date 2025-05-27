// src/services/authService.ts
type UserData = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  email: string;
  userId: string;
  roleId: string;
};

class AuthService {
  private static instance: AuthService;
  private userData: UserData | null = null;
  private tokenExpirationTimer: number | null = null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public login(data: UserData): void {
    this.userData = {
      ...data,
      expires_in: Number(data.expires_in)
    };
    this.setTokenExpirationTimer();
  }

  public logout(): void {
    this.userData = null;
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  public getToken(): string | null {
    if (!this.userData) return null;
    return this.userData.access_token;
  }

  public getUserData(): Omit<UserData, 'access_token' | 'refresh_token'> | null {
    if (!this.userData) return null;
    const { access_token, refresh_token, ...userData } = this.userData;
    return userData;
  }

  public isAuthenticated(): boolean {
    return !!this.userData;
  }

  private setTokenExpirationTimer(): void {
    if (!this.userData) return;
    
    // Limpiamos el timer anterior si existe
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    // Configuramos un nuevo timer para cuando expire el token
    this.tokenExpirationTimer = window.setTimeout(() => {
      this.logout();
      // Aquí podrías redirigir al login o intentar renovar el token
    }, (this.userData.expires_in - 60) * 1000); // 1 minuto antes de que expire
  }
}

export const authService = AuthService.getInstance();