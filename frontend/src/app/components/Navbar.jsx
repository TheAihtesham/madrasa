"use client";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user } = useUser();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Notices", href: "/notice" },
    { name: "Courses", href: "/#courses" },
    { name: "Donations", href: "/donation" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="flex justify-between items-center px-5 py-4 bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <h1
          className="text-2xl font-bold text-green-800 tracking-tight cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span className="font-['Noto_Nastaliq_Urdu'] text-2xl"></span> مدرسة حياة المسلمي
        </h1>
        <div className="hidden lg:flex gap-8 text-lg font-medium text-stone-700">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-green-600 transition border-b-2 border-transparent hover:border-green-600 pb-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 items-center">
          {!user ? (
            <SignInButton mode="modal">
              <button className="hidden sm:block px-5 py-2 text-sm font-semibold border-2 border-green-700 text-green-700 rounded-full hover:bg-green-700 hover:text-white transition shadow-md">
                Login
              </button>
            </SignInButton>
          ) : (
            <SignOutButton>
              <button className="hidden sm:block px-5 py-2 text-sm font-semibold bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-md">
                Logout
              </button>
            </SignOutButton>
          )}

          <button
            onClick={() => router.push("/admin")}
            className="hidden sm:block px-5 py-2 text-sm font-semibold bg-green-800 text-white rounded-full hover:bg-green-700 transition"
          >
            Admin Portal
          </button>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={toggleMenu}>
            {menuOpen ? <X size={28} className="text-green-800" /> : <Menu size={28} className="text-green-800" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-white shadow-lg p-6 space-y-4 z-40">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-lg font-medium text-stone-700 hover:text-green-600 transition"
            >
              {link.name}
            </a>
          ))}

          {/* Login / Logout */}
          {!user ? (
            <SignInButton mode="modal">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full px-5 py-2 text-sm font-semibold border-2 border-green-700 text-green-700 rounded-full hover:bg-green-700 hover:text-white transition"
              >
                Login
              </button>
            </SignInButton>
          ) : (
            <SignOutButton>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full px-5 py-2 text-sm font-semibold bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              >
                Logout
              </button>
            </SignOutButton>
          )}

          <button
            onClick={() => {
              setMenuOpen(false);
              router.push("/admin");
            }}
            className="w-full px-5 py-2 text-sm font-semibold bg-green-800 text-white rounded-full hover:bg-green-700 transition"
          >
            Admin Portal
          </button>
        </div>
      )}
    </>
  );
}
