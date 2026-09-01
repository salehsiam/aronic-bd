export async function loginCustomer(email: string, password: string) {
    const res = await fetch('/api/customers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.errors?.[0]?.message || 'Login failed')
    return data
}

export async function registerCustomer(name: string, email: string, phone: string, password: string) {
    const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.errors?.[0]?.message || 'Registration failed')

    // Registration er por auto-login koro
    return loginCustomer(email, password)
}

export async function logoutCustomer() {
    await fetch('/api/customers/logout', {
        method: 'POST',
        credentials: 'include',
    })
}

export async function getCurrentCustomer() {
    const res = await fetch('/api/customers/me', {
        credentials: 'include',
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.user || null
}