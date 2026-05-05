import { getPayload } from 'payload'
import config from '@payload-config'

async function getData() {
  const payload = await getPayload({ config })
  const [noticesRes] = await Promise.all([
    payload.find({
      collection: 'notices',
      where: { isPublished: { equals: true } },
      sort: '-publishDate',
    }),
  ])
  return { notices: noticesRes.docs }
}

export default async function Marquee() {
  const { notices } = await getData()

  return (
    <div className="bg-green-800 text-yellow-200 text-xs font-medium py-1.5 overflow-hidden whitespace-nowrap">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(100vw); }
          to   { transform: translateX(-100%); }
        }
        .marquee-track { animation: marquee 35s linear infinite; }
      `}</style>
      <div className="marquee-track inline-block">
        {notices.map((item, i) => (
          <span key={i} className="mx-10">
            <span className="text-yellow-400">◆ </span>
            {item.title || []}
          </span>
        ))}
      </div>
    </div>
  )
}
