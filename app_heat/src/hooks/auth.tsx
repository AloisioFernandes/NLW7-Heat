import React, { createContext, useContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as AuthSessions from 'expo-auth-session'
import { api } from '../services/api'

const CLIENT_ID = 'c4556936a066b88fd0cd'
const SCOPE = 'read:user'
const USER_STORAGE = '@nlwheat:user'
const TOKEN_STORAGE = '@nlwheat:token'

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: React.ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
  }
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  async function signIn() {
    setIsSigningIn(true)
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
    const { params } = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse
    
    if(params && params.code) {
      const authResponse = await api.post('/authenticate', { code: params.code })
      const { user, token } = authResponse.data as AuthResponse

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(authResponse))
      await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token))

      setUser(user)
    }

    setIsSigningIn(false)
  }

  async function signOut() {
    
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user,
      isSigningIn
    }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }