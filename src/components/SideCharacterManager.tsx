import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, UserPlus } from "lucide-react";
import SideCharacterCard from "./SideCharacterCard";

interface SideCharacter {
  id: string;
  name: string;
  description: string;
  image?: string;
}

interface SideCharacterManagerProps {
  sideCharacters: SideCharacter[];
  onAddSideCharacter: (character: Omit<SideCharacter, 'id'>) => void;
  onEditSideCharacter: (character: SideCharacter) => void;
  onDeleteSideCharacter: (characterId: string) => void;
  onDuplicateSideCharacter: (character: SideCharacter) => void;
}

const SideCharacterManager = ({ 
  sideCharacters, 
  onAddSideCharacter, 
  onEditSideCharacter, 
  onDeleteSideCharacter, 
  onDuplicateSideCharacter 
}: SideCharacterManagerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    description: "",
    image: ""
  });

  const handleSave = () => {
    if (!newCharacter.name || !newCharacter.description) return;

    onAddSideCharacter({
      name: newCharacter.name,
      description: newCharacter.description,
      image: newCharacter.image || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000) + 1500000000000}-${Math.floor(Math.random() * 100000)}?w=200&h=200&fit=crop&crop=face`
    });

    setNewCharacter({ name: "", description: "", image: "" });
    setIsDialogOpen(false);
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            الشخصيات الجانبية
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                إضافة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-right">إضافة شخصية جانبية جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="char-name">اسم الشخصية</Label>
                  <Input
                    id="char-name"
                    placeholder="مثال: صديق، حيوان أليف، لعبة..."
                    value={newCharacter.name}
                    onChange={(e) => setNewCharacter(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="char-description">الوصف</Label>
                  <Textarea
                    id="char-description"
                    placeholder="اكتب وصفاً موجزاً للشخصية الجانبية..."
                    value={newCharacter.description}
                    onChange={(e) => setNewCharacter(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="char-image">رابط الصورة (اختياري)</Label>
                  <Input
                    id="char-image"
                    placeholder="https://..."
                    value={newCharacter.image}
                    onChange={(e) => setNewCharacter(prev => ({ ...prev, image: e.target.value }))}
                  />
                </div>
                <Button 
                  onClick={handleSave} 
                  className="w-full" 
                  disabled={!newCharacter.name || !newCharacter.description}
                >
                  حفظ الشخصية
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {sideCharacters.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {sideCharacters.map((character) => (
              <SideCharacterCard
                key={character.id}
                character={character}
                onEdit={onEditSideCharacter}
                onDelete={onDeleteSideCharacter}
                onDuplicate={onDuplicateSideCharacter}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <UserPlus className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">لا توجد شخصيات جانبية</p>
            <p className="text-xs">أضف شخصيات جانبية لإثراء قصتك</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SideCharacterManager;