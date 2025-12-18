'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Animated Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Billinator Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-white text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Billinator
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-white/80 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border border-purple-500/50 text-purple-300 text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
              ✨ FREE TO USE UNTIL 2027 • UNDER DEVELOPMENT
            </span>
          </div>
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/logo.png"
                alt="Billinator Logo"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
          <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Billinator
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            The Future of GST Billing & Inventory Management
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Complete multi-tenant solution for invoicing, inventory tracking, CRM, and comprehensive reporting. 
            Built with cutting-edge technology for modern businesses.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/register"
              className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-10 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </Link>
            <Link
              href="/login"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all transform hover:scale-105"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          Everything You Need
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">
          Powerful features designed for modern businesses
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'GST Invoicing', 
              desc: 'B2B, B2C, Bill of Supply, Credit/Debit Notes - Fully GST compliant',
              icon: '📄'
            },
            { 
              title: 'Inventory Management', 
              desc: 'Real-time stock tracking, low stock alerts, weighted average costing',
              icon: '📦'
            },
            { 
              title: 'Multi-Tenant Architecture', 
              desc: 'Complete data isolation with enterprise-grade security',
              icon: '🔒'
            },
            { 
              title: 'CRM System', 
              desc: 'Opportunities, Quotes, Activities, Notes, and Contact management',
              icon: '👥'
            },
            { 
              title: 'Comprehensive Reports', 
              desc: 'Sales, Purchase, GST, Stock, Customer, and P&L reports',
              icon: '📊'
            },
            { 
              title: 'Role-Based Access', 
              desc: 'Admin, Billing, and Inventory Manager roles with fine-grained control',
              icon: '🛡️'
            },
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join businesses already using Billinator to streamline their operations
          </p>
          <Link
            href="/register"
            className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-10 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
          >
            Start Free Today
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-md border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Billinator Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Billinator
              </h3>
            </div>
            <p className="text-gray-400 mb-2 text-lg">
              Free to Use Until 2027 • Under Active Development
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Developed by{' '}
              <a 
                href="https://medhalabs.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
              >
                Medhā Labs
              </a>
            </p>
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Medhā Labs. All Rights Reserved.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Visit us at{' '}
              <a 
                href="https://medhalabs.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                https://medhalabs.in/
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

