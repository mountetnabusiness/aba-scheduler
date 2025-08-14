'use client'

import { useEffect, useState } from "react"
import { format } from "timeago.js"

type Employee = {
  id: string
  firstName: string
  lastName: string
  createdAt: string
}

export function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEmployees() {
      const res = await fetch("/api/employees")
      const text = await res.text()

      try {
        const data = JSON.parse(text)
        setEmployees(data.employees || [])
      } catch (_err) {
        console.error("❌ Failed to parse JSON:", text)
      }

      setLoading(false)
    }

    fetchEmployees()
  }, [])

  if (loading) return <p className="text-sm text-muted-foreground">Loading employees...</p>

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
          {employees.map(emp => {
            const createdDate = new Date(emp.createdAt)
            const tooltip = createdDate.toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })

            return (
              <tr key={emp.id} className="border-t">
                <td className="px-4 py-2">{emp.firstName}</td>
                <td className="px-4 py-2">{emp.lastName}</td>
                <td className="px-4 py-2 text-muted-foreground" title={tooltip}>
                  {format(emp.createdAt)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
