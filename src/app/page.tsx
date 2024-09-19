'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Clock, Shield, Menu } from 'lucide-react'
// Assuming the Button component is located in a different path, adjust the import accordingly
import { Button } from '../../components/ui/button'
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">HealthPredict AI</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <NavItem href="#home">Home</NavItem>
            <NavItem href="#about">About</NavItem>
            <NavItem href="#contact">Contact</NavItem>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </nav>
        
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 bg-white rounded-lg shadow-lg"
          >
            <NavItem href="#home" mobile>Home</NavItem>
            <NavItem href="#about" mobile>About</NavItem>
            <NavItem href="#contact" mobile>Contact</NavItem>
          </motion.div>
        )}

        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span className="block xl:inline">Predict Your Health with</span>{' '}
              <span className="block text-blue-600 xl:inline">AI Precision</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              Our cutting-edge machine learning algorithm analyzes your symptoms to provide accurate disease predictions and personalized health insights.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
            >
              <div className="rounded-md shadow">
                <Link href="/diagnose" passHref>
                  <Button size="lg" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                    Start Diagnosis
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </main>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <FeatureCard 
            icon={<Brain className="w-12 h-12 text-blue-600" />}
            title="AI-Powered Analysis"
            description="Utilizes state-of-the-art machine learning for highly accurate predictions"
          />
          <FeatureCard 
            icon={<Clock className="w-12 h-12 text-blue-600" />}
            title="Instant Results"
            description="Get comprehensive health insights in minutes, not hours or days"
          />
          <FeatureCard 
            icon={<Shield className="w-12 h-12 text-blue-600" />}
            title="Secure & Private"
            description="Your health data is encrypted and protected with industry-leading security measures"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 bg-blue-50 rounded-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-gray-600 mb-8">"HealthPredict AI has revolutionized how we approach early disease detection. It's fast, accurate, and incredibly user-friendly."</p>
          <p className="text-lg font-semibold text-blue-600">Dr. Emily Chen, Chief of Medicine at Greenwood Hospital</p>
        </motion.div>
      </div>

      <footer className="mt-24 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">&copy; 2023 HealthPredict AI. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-900">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-900">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

function NavItem({ href, children, mobile = false }: NavItemProps) {
  return (
    <a 
      href={href} 
      className={`text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
        mobile ? 'block px-4 py-2 hover:bg-gray-100' : ''
      }`}
    >
      {children}
    </a>
  )
}

function FeatureCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl">
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-bold mb-2 text-gray-900">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}