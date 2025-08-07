'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Users, Calendar, Settings } from "lucide-react"

const navItems = [
  {
    name: 'Clients',
    href: '/clients/list', // now links directly to list
    icon: Users,
  },
  {
    name: 'Employees',
    href: '/employees/list',
    icon: Users,
  },
  {
    name: 'Calendar',
    href: '/calendar',
    icon: Calendar,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block h-screen">
      <div className="p-4 font-bold text-lg">Etna Scheduler</div>
      <nav className="space-y-2 px-4">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              )}
            >
              <Icon className="h-4 w-4" />
              {name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
