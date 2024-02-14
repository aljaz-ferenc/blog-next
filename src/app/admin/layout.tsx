'use client'

import React, { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [password, setPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
  return (
    <>
      <h1>Admin</h1>
      {isLoggedIn && <div>{children}</div>}
    </>
  );
}
