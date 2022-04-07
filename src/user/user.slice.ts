import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Right, Secured, User } from './user';
import { login as doLogin, 
  LoginError, 
  logout as doLogout, 
  loginWithAuthResponse as doLoginWithAuthResponse, 
  CredentialCreator, AuthResponse, LoginProvider } from './login/login.service';
import { RootState } from '../store';

type UserSliceState = {
  authenticated: boolean,
  user?: User,
  error?: LoginError,
  loading: boolean,
  provider?: LoginProvider
};

const initialState: UserSliceState = {
  authenticated: false,
  user: undefined,
  error: undefined,
  loading: false,
  provider: undefined,
}

export const login = createAsyncThunk('user/login', (payload: { username: string, password: string }) => {
  return doLogin(payload.username, payload.password);
});

export const loginWithAuthResponse = createAsyncThunk('user/loginWithAuthResponse', 
(payload: { response: AuthResponse, credentialCreator: CredentialCreator, provider: LoginProvider },
  { dispatch }) => {
  dispatch(userSlice.actions.setProvider(payload.provider));
  return doLoginWithAuthResponse(payload.response, payload.credentialCreator);
});

export const logout = createAsyncThunk('user/logout', () => {
  return doLogout();
});


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sessionExpire: (state) => {
      state.user = undefined;
      state.authenticated = false;
      state.error = undefined;
    },
    setProvider: (state, action: PayloadAction<LoginProvider>) => {
      state.provider = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.provider = LoginProvider.Manual;
      })
      .addCase(login.fulfilled, (state, action) => {
        const user: User = action.payload;
        state.user = user;
        state.authenticated = true;
        state.error = undefined;
        state.loading = false;
        state.provider = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = LoginError[action.error.message as keyof typeof LoginError] ?? LoginError.OTHER;
        state.loading = false;
        state.provider = undefined;
      })
      .addCase(loginWithAuthResponse.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginWithAuthResponse.fulfilled, (state, action) => {
        const user: User = action.payload;
        state.user = user;
        state.authenticated = true;
        state.error = undefined;
        state.loading = false;
        state.provider = undefined;
      })
      .addCase(loginWithAuthResponse.rejected, (state, action) => {
        state.error = LoginError[action.error.message as keyof typeof LoginError] ?? LoginError.OTHER;
        state.loading = false;
        state.provider = undefined;
      })
      .addCase(logout.pending, (state) => {
        state.user = undefined;
        state.authenticated = false;
        state.error = undefined;
      })
  }
});


export const selectUser = (state: RootState) => {
  return state.user.user;
}

export const selectIsAuthenticated = (state: RootState) => {
  return state.user.authenticated;
}

export const selectError = (state: RootState) => {
  return state.user.error;
}

export const selectLoading = (state: RootState) => {
  return state.user.loading;
}

export const selectProvider = (state: RootState) => {
  return state.user.provider;
}

export const hasRight = (subject: Secured | null | undefined, right: Right) => {
  return (state: RootState) => {
    if(!subject){
      return false;
    }
    if(!subject.rights) {
      return true;
    }
    const user = selectUser(state);
    if(!user) {
      return false;
    }
    const userRights = subject.rights[user?.uid] ?? undefined;
    return userRights.includes(right);
  }
}

export const { sessionExpire } = userSlice.actions;

export default userSlice.reducer;