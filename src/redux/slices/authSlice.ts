import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService, LoginCredentials, RegisterCredentials } from '../../services/authService';

interface AuthState {
  token: string | null;
  userId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
};

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async () => {
    const { token } = await authService.initializeAuth();
    return { token };
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    return {
      token: response.token,
      userId: response.id?.toString() || null,
    };
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials) => {
    const response = await authService.register(credentials);
    return {
      token: response.token,
      userId: response.id?.toString() || null,
    };
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.userId = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 