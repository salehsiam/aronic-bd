'use client'

import { useRouter } from 'next/navigation'
import { logoutCustomer } from '@/lib/customerAuth'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutCustomer()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-body text-ink/60 hover:text-ink border border-ink/20 px-4 py-2 transition-colors"
    >
      Sign Out
    </button>
  )
}