import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Copy } from "lucide-react";

interface SideCharacter {
  id: string;
  name: string;
  description: string;
  image?: string;
}

interface SideCharacterCardProps {
  character: SideCharacter;
  onEdit?: (character: SideCharacter) => void;
  onDelete?: (characterId: string) => void;
  onDuplicate?: (character: SideCharacter) => void;
}

const SideCharacterCard = ({ character, onEdit, onDelete, onDuplicate }: SideCharacterCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-smooth border border-border/50">
      <div className="relative aspect-square overflow-hidden bg-gradient-subtle">
        {character.image && !imageError ? (
          <>
            <img
              src={character.image}
              alt={character.name}
              className={`w-full h-full object-cover transition-all duration-300 ${
                imageLoaded 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-110'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center gradient-subtle">
            <div className="text-center">
              <div className="w-8 h-8 gradient-hero rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-sm font-bold text-white">
                  {character.name.charAt(0)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">لا توجد صورة</p>
            </div>
          </div>
        )}
        
        {/* Action menu */}
        {(onEdit || onDelete || onDuplicate) && (
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="icon"
                  className="w-6 h-6 bg-white/90 hover:bg-white backdrop-blur-sm shadow-sm border-0"
                >
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(character)}>
                    <Edit className="w-3 h-3 mr-2" />
                    تعديل
                  </DropdownMenuItem>
                )}
                {onDuplicate && (
                  <DropdownMenuItem onClick={() => onDuplicate(character)}>
                    <Copy className="w-3 h-3 mr-2" />
                    نسخ
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem 
                    onClick={() => onDelete(character.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="w-3 h-3 mr-2" />
                    حذف
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      
      <div className="p-2">
        <h4 className="font-medium text-sm text-foreground truncate mb-1">
          {character.name}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {character.description}
        </p>
        <Badge variant="outline" className="text-xs mt-1 bg-primary/5 text-primary/70 border-primary/20">
          شخصية جانبية
        </Badge>
      </div>
    </div>
  );
};

export default SideCharacterCard;