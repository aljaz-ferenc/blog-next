"use client";

import { getPosts } from "@/app/actions";
import { Post } from "@prisma/client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
    isLoggedIn: boolean
    login:() => void
    logout: () => void
    posts: Post[]
    updatePosts: () => void
}

interface AuthContextProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
      updatePosts()
  }, [])

  function updatePosts(){
    getPosts()
    .then(posts => setPosts(posts))
    .catch((err) => console.log((err.message)) )
  }

  function login() {
    setIsLoggedIn(true);
  }

  function logout() {
    setIsLoggedIn(false);
  }


  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout, posts, updatePosts}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const ctx = useContext(AuthContext)

  if(!ctx) throw new Error('useAuth must be used within an AuthProvider')

  return ctx
}
