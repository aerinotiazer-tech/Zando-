import * as React from "react"
import { cn } from "../../lib/utils"
import { Product } from "../../lib/types"
import { Heart, MapPin, Star, ShieldCheck } from "lucide-react"
import { Badge } from "./badge"
import { Button } from "./button"

interface ProductCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  product: Product
  onFavorite?: (id: string) => void
  onAddToCart?: (id: string) => void
  onClick?: (id: string) => void
  isFavorite?: boolean
}

export function ProductCard({ 
  product, 
  onFavorite, 
  onAddToCart, 
  onClick, 
  isFavorite = false,
  className, 
  ...props 
}: ProductCardProps) {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-NE', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('XOF', 'FCFA');
  };

  return (
    <div 
      className={cn("group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-slate-200 cursor-pointer", className)} 
      {...props}
      onClick={() => onClick && onClick(product.id)}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.stock === 0 && (
            <Badge variant="destructive" className="bg-red-500/90 backdrop-blur font-medium">Rupture</Badge>
          )}
        </div>

        {/* Favorite Button */}
        {onFavorite && (
          <button 
            onClick={(e) => { e.stopPropagation(); onFavorite(product.id); }}
            className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur text-slate-400 hover:text-red-500 transition-colors shadow-sm"
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-red-500 text-red-500")} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-medium text-brand-600 truncate">{product.category}</p>
          <div className="flex items-center text-xs text-slate-500">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
            <span>4.8</span>
          </div>
        </div>
        
        <h3 className="font-display font-medium text-slate-900 line-clamp-1 mb-1">{product.name}</h3>
        
        <div className="flex items-end justify-between mt-auto pt-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</span>
            <div className="flex items-center text-xs text-slate-500 mt-0.5">
              <ShieldCheck className="h-3 w-3 text-emerald-500 mr-1" />
              <span>Vendeur vérifié</span>
            </div>
          </div>
          
          {onAddToCart && (
            <Button 
              size="sm" 
              className="rounded-full px-4"
              onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}
            >
              Ajouter
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
