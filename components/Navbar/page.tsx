"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname(); // Get the current route

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">KT</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-8 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Support
                    </button>
                </div>
                <div className="p-5 items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col text-xl p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                            <Link
                                href="/dashboard"
                                className={`block py-2 px-3 md:p-0 rounded ${
                                    pathname === "/recieve"
                                        ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                }`}
                                aria-current={pathname === "/dashboard" ? "page" : undefined}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/send"
                                className={`block py-2 px-3 md:p-0 rounded ${
                                    pathname === "/send"
                                        ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                }`}
                                aria-current={pathname === "/send" ? "page" : undefined}
                            >
                                Send
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/recieve"
                                className={`block py-2 px-3 md:p-0 rounded ${
                                    pathname === "/recieve"
                                        ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                }`}
                                aria-current={pathname === "/recieve" ? "page" : undefined}
                            >
                                Recieve
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
