'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  )
}
