'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export function AddEmployeeForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/employees", {
      method: "POST",
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push("/employees/list")
    } else {
      console.error("❌ Failed to create employee")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        value={form.firstName}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last name"
        value={form.lastName}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Add Employee
      </button>
    </form>
  )
}
