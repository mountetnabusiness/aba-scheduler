'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function AddClientForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName }),
      })

      const text = await res.text()
      console.log("🧪 Raw response from server:", text)

      let result
      try {
        result = JSON.parse(text)
      } catch (parseErr) {
        console.error("❌ Failed to parse JSON response:", parseErr)
        throw new Error("Invalid response from server.")
      }

      if (!res.ok) {
        throw new Error(result?.error || 'Failed to create client.')
      }

      toast.success('✅ Client created successfully!')
      setFirstName('')
      setLastName('')

      // Optional: redirect to list after creation
      router.push('/clients/list')

    } catch (err) {
      console.error("❌ Client creation error:", err)
      toast.error((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <Input
        placeholder="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        required
      />
      <Input
        placeholder="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Client'}
      </Button>
    </form>
  )
}
