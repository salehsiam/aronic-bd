import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import { LogoutButton } from '@/components/ui/LogoutButton'

export default async function AccountPage() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) {
    redirect('/account/login')
  }

  let customer
  try {
    const result = await payload.auth({
      headers: new Headers({ cookie: `payload-token=${token}` }),
    })
    customer = result.user
  } catch {
    redirect('/account/login')
  }

  if (!customer) {
    redirect('/account/login')
  }

  const orders = await payload.find({
    collection: 'orders',
    where: { customer: { equals: customer.id } },
    sort: '-createdAt',
    limit: 20,
  })

  return (
    <div className="min-h-screen bg-cotton">
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
              My Account
            </p>
            <h1 className="font-display text-4xl text-ink">Hello, {customer.name}</h1>
          </div>
          <LogoutButton />
        </div>

        <div className="border border-line p-6 mb-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-4">
            Account Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm font-body">
            <div>
              <p className="text-ink/50">Email</p>
              <p className="text-ink mt-1">{customer.email}</p>
            </div>
            <div>
              <p className="text-ink/50">Phone</p>
              <p className="text-ink mt-1">{(customer as any).phone}</p>
            </div>
          </div>
        </div>

        <h2 className="font-display text-2xl text-ink mb-6">Order History</h2>

        {orders.docs.length === 0 ? (
          <p className="font-body text-sm text-ink/50">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.docs.map((order: any) => (
              <div key={order.id} className="border border-line p-5 flex items-center justify-between">
                <div>
                  <p className="font-mono text-sm text-ink">{order.orderNumber}</p>
                  <p className="font-body text-xs text-ink/50 mt-1">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-indigo">৳{order.total}</p>
                  <p className="font-mono text-xs text-ink/50 uppercase mt-1">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}