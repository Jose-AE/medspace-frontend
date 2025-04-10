"use client";

import * as React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="text-2xl font-bold">
          MedSpace
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/about" className="hover:text-gray-200">
              About
            </Link>
          </li>
          <li>
            <Link href="/services" className="hover:text-gray-200">
              Services
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
