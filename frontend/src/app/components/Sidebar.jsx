"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Bell,
  CreditCard,
  Gift,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar() {

  const router = useRouter()
  const path = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Teachers", href: "/admin/teachers", icon: BookOpen },
    { name: "Notices", href: "/admin/notices", icon: Bell },
    { name: "Fees", href: "/admin/fees", icon: CreditCard },
    { name: "Donations", href: "/admin/donations", icon: Gift },
    { name: "Expense", href: "/admin/expense", icon: Wallet },
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6 text-center cursor-pointer" onClick={() => router.push("/")}>Madrasa</h2>
      <nav className="space-y-2">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-green-100 transition ${path === href ? "bg-green-200 font-semibold" : ""
              }`}
          >
            <Icon size={18} />
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
