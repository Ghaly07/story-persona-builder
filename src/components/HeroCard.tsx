import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Play, MoreHorizontal, Edit, Trash2, Copy, Download } from "lucide-react";

interface Hero {
  id: string;
  name: string;
  gender: string;
  ageGroup: string;
  style: string;
  description: string;
  image?: string;
}

interface HeroCardProps {
  hero: Hero;
  onUse: (hero: Hero) => void;
  onEdit: (hero: Hero) => void;
  onDelete: (heroId: string) => void;
  onDuplicate: (hero: Hero) => void;
}

const HeroCard = ({ hero, onUse, onEdit, onDelete, onDuplicate }: HeroCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-float transition-smooth hover-lift animate-slide-up bg-card/80 backdrop-blur-sm">
      <div className="relative aspect-square overflow-hidden bg-gradient-subtle">
        {hero.image && !imageError ? (
          <>
            <img
              src={hero.image}
              alt={hero.name}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-110'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center gradient-subtle">
            <div className="text-center">
              <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto mb-3 animate-float">
                <span className="text-2xl font-bold text-white">
                  {hero.name.charAt(0)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">لا توجد صورة</p>
            </div>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <Button
            onClick={() => onUse(hero)}
            size="sm"
            className="gradient-hero text-white hover:shadow-hero transform scale-90 group-hover:scale-100 transition-all duration-300"
          >
            <Play className="w-4 h-4 mr-2" />
            استخدام
          </Button>
        </div>

        {/* Action menu */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="secondary" 
                size="icon"
                className="w-8 h-8 bg-white/90 hover:bg-white backdrop-blur-sm shadow-sm border-0"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onEdit(hero)}>
                <Edit className="w-4 h-4 mr-2" />
                تعديل
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(hero)}>
                <Copy className="w-4 h-4 mr-2" />
                نسخ
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" />
                تحميل
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(hero.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-foreground truncate flex-1">
            {hero.name}
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {hero.gender && (
            <Badge variant="secondary" className="text-xs">
              {hero.gender === 'male' ? 'ذكر' : hero.gender === 'female' ? 'أنثى' : 'آخر'}
            </Badge>
          )}
          {hero.ageGroup && (
            <Badge variant="outline" className="text-xs">
              {hero.ageGroup}
            </Badge>
          )}
          {hero.style && (
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
              {hero.style}
            </Badge>
          )}
        </div>
        
        {hero.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {hero.description}
          </p>
        )}

        <Button
          onClick={() => onUse(hero)}
          className="w-full gradient-hero text-white hover:shadow-hero transition-smooth"
        >
          <Play className="w-4 h-4 mr-2" />
          استخدام الشخصية
        </Button>
      </div>
    </Card>
  );
};

export default HeroCard;