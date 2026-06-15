import { User } from "@/types"

export default function UserTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-gray-800"><th className="py-2 text-left text-gray-400">Username</th><th className="py-2 text-left text-gray-400">Verified</th><th className="py-2 text-left text-gray-400">Sales</th></tr></thead>
        <tbody>{users.map(u => <tr key={u.id} className="border-b border-gray-800"><td className="py-2">{u.username}</td><td className="py-2">{u.verified ? "Yes" : "No"}</td><td className="py-2">{u.successful_sales}</td></tr>)}</tbody>
      </table>
    </div>
  )
}