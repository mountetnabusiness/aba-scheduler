'use client'

import { useEffect, useState } from "react"
import { format } from "timeago.js"

type Client = {
  id: string
  firstName: string
  lastName: string
  createdAt: string
}

export function ClientList() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClients() {
      const res = await fetch("/api/clients")
      const text = await res.text()

      try {
        const data = JSON.parse(text)
        setClients(data.clients || [])
      } catch (err) {
        console.error("❌ Failed to parse JSON:", text)
      }

      setLoading(false)
    }

    fetchClients()
  }, [])

  if (loading) return <p className="text-sm text-muted-foreground">Loading clients...</p>

  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">First Name</th>
            <th className="text-left px-4 py-2">Last Name</th>
            <th className="text-left px-4 py-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => {
            const createdDate = new Date(client.createdAt)
            const tooltip = createdDate.toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })

            return (
              <tr key={client.id} className="border-t">
                <td className="px-4 py-2">{client.firstName}</td>
                <td className="px-4 py-2">{client.lastName}</td>
                <td className="px-4 py-2 text-muted-foreground" title={tooltip}>
                  {format(client.createdAt)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
