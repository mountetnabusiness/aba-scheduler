import Link from "next/link"
import { EmployeeList } from "@/components/EmployeeList"

export default function EmployeeListPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Employees</h1>
        <Link
          href="/employees/add"
          className="text-sm px-3 py-1 rounded bg-black text-white hover:bg-gray-800"
        >
          Add Employee
        </Link>
      </div>
      <EmployeeList />
    </div>
  )
}
