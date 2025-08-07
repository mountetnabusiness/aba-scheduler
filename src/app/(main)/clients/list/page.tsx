import Link from "next/link"
import { ClientList } from "@/components/ClientList"

export default function ClientListPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Clients</h1>
        <Link
          href="/clients/add"
          className="text-sm px-3 py-1 rounded bg-black text-white hover:bg-gray-800"
        >
          Add Client
        </Link>
      </div>
      <ClientList />
    </div>
  )
}
