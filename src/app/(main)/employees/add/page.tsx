import { AddEmployeeForm } from "@/components/AddEmployeeForm"

export default function EmployeesPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>
      <AddEmployeeForm />
    </main>
  )
}
