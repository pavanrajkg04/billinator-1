'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface NavItem {
  text: string
  href: string
  icon?: string
}

interface LayoutProps {
  children: React.ReactNode
  navItems?: NavItem[]
  refreshCallback?: () => void
}

export default function Layout({ children, navItems = [], refreshCallback }: LayoutProps) {
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/login')
  }

  const navItemsDefault: NavItem[] = [
    { text: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { text: 'Sales Pipeline', href: '/opportunities', icon: '🎯' },
    { text: 'Quotes', href: '/quotes', icon: '📄' },
    { text: 'Activities', href: '/activities', icon: '📅' },
    { text: 'Customers', href: '/customers', icon: '👥' },
    { text: 'Products', href: '/products', icon: '📦' },
    { text: 'Suppliers', href: '/suppliers', icon: '🚚' },
    { text: 'Purchases', href: '/purchases', icon: '🛒' },
    { text: 'Sales', href: '/sales', icon: '🧾' },
    { text: 'Stocks', href: '/stocks', icon: '📊' },
    { text: 'Outstanding', href: '/outstanding', icon: '💰' },
    { text: 'Reports', href: '/reports', icon: '📈' },
    { text: 'Users & Roles', href: '/users', icon: '👤' },
    { text: 'Settings', href: '/settings', icon: '⚙️' },
  ]

  const items = navItems.length > 0 ? navItems : navItemsDefault

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <Image
              src="/logo.png"
              alt="Billinator Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Billinator</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {refreshCallback && (
          <>
            <div className="border-t border-gray-200 p-4">
              <button
                onClick={refreshCallback}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
          </>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

