import { Outlet } from 'react-router-dom'
import { NotificationsProvider } from '../../context/NotificationsContext'
import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <NotificationsProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
        <Header />
        <main className="flex-grow">
          {children || <Outlet />}
        </main>
        <Footer />
      </div>
    </NotificationsProvider>
  )
}

export default Layout
