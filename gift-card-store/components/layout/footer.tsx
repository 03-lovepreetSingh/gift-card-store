import Link from 'next/link'
import { Facebook, Twitter, Instagram, Github } from 'lucide-react'
export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200 pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#ff7e5f]"
              >
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                <path d="M18 12a2 2 0 0 0 0 4h2v-4Z" />
              </svg>
              <span className="text-xl font-bold">GiftCrypto</span>
            </Link>
            <p className="text-neutral-400 text-sm mt-2 mb-4">
              GiftCrypto is your go-to platform for digital gift cards and
              vouchers, offering unbeatable deals and savings on top brands.
              Join us and start saving today!
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-[#ff7e5f] transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-[#ff7e5f] transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-[#ff7e5f] transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-[#ff7e5f] transition-colors"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-neutral-400">
              <li>For Support Queries: support@giftcrypto.app</li>
              <li>For Business Inquiries: contact@giftcrypto.app</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-[#ff7e5f] transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-[#ff7e5f] transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-[#ff7e5f] transition-colors text-sm"
                >
                  Corporate Gifting
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-[#ff7e5f] transition-colors text-sm"
                >
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-neutral-400 hover:text-[#ff7e5f] transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-neutral-400 hover:text-[#ff7e5f] transition-colors text-sm"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="text-neutral-400 hover:text-[#ff7e5f] transition-colors text-sm"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-neutral-400 hover:text-[#ff7e5f] transition-colors text-sm"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-neutral-800 text-sm text-neutral-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>
              © {new Date().getFullYear()} GiftCrypto - All Rights Reserved
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-[#ff7e5f]">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#ff7e5f]">
                Terms & Conditions
              </Link>
              <Link href="#" className="hover:text-[#ff7e5f]">
                Refund Policies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
