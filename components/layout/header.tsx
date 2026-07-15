import * as React from "react"
import { Search, ShoppingBag, Heart, User, Menu } from "lucide-react"
import { Button } from "../ui/button"

import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display font-bold text-xl tracking-tight text-slate-900">
            ZANDO<span className="text-brand-500">.</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-slate-900 transition-colors">Découvrir</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Catégories</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Vendeurs vérifiés</a>
          </nav>
        </div>

        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Rechercher un produit, une marque..." 
              className="w-full h-10 pl-10 pr-4 rounded-full bg-slate-100 border-transparent text-sm focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex text-slate-600 hover:text-slate-900">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900">
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex text-slate-600 hover:text-slate-900">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="premium" size="sm" className="hidden md:flex rounded-full">
            Vendre
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden text-slate-600">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
