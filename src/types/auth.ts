export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
  }
  
  export interface SignInData {
    email: string;
    password: string;
  }
  
  export interface SignUpData extends SignInData {
    name: string;
  }