import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Users, Plus, Trash2 } from "lucide-react";
import CharacterSelector from "./CharacterSelector";

interface Hero {
  id: string;
  name: string;
  gender: string;
  ageGroup: string;
  style: string;
  description: string;
  image?: string;
}

interface Scene {
  id: string;
  title: string;
  description: string;
  selectedCharacters: Hero[];
}

interface SceneCardProps {
  scene: Scene;
  sceneNumber: number;
  heroes: Hero[];
  canDelete: boolean;
  onUpdateScene: (sceneId: string, field: string, value: string) => void;
  onRemoveScene: (sceneId: string) => void;
  onAddCharacter: (sceneId: string, character: Hero) => void;
  onRemoveCharacter: (sceneId: string, characterId: string) => void;
}

const SceneCard = ({
  scene,
  sceneNumber,
  heroes,
  canDelete,
  onUpdateScene,
  onRemoveScene,
  onAddCharacter,
  onRemoveCharacter
}: SceneCardProps) => {
  const [showCharacterSelector, setShowCharacterSelector] = useState(false);

  return (
    <Card className="shadow-card hover:shadow-float transition-smooth animate-scale-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center text-white font-bold text-sm">
            {sceneNumber}
          </div>
          <div className="flex-1">
            <Input
              value={scene.title}
              onChange={(e) => onUpdateScene(scene.id, "title", e.target.value)}
              className="border-0 bg-transparent p-0 text-lg font-semibold focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="عنوان المشهد"
            />
          </div>
        </div>
        
        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveScene(scene.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Scene Description */}
        <div className="space-y-2">
          <Label htmlFor={`scene-desc-${scene.id}`}>وصف المشهد</Label>
          <Textarea
            id={`scene-desc-${scene.id}`}
            placeholder="اكتب وصف تفصيلي لما يحدث في هذا المشهد..."
            value={scene.description}
            onChange={(e) => onUpdateScene(scene.id, "description", e.target.value)}
            className="bg-background border-border focus:border-primary transition-smooth resize-none"
            rows={3}
          />
        </div>

        {/* Characters Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              الشخصيات في المشهد
            </Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCharacterSelector(true)}
              className="bg-background hover:bg-muted transition-smooth"
            >
              <Plus className="w-3 h-3 mr-1" />
              إضافة شخصية
            </Button>
          </div>

          {/* Selected Characters */}
          {scene.selectedCharacters.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {scene.selectedCharacters.map((character) => (
                <div
                  key={character.id}
                  className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:shadow-sm transition-smooth"
                >
                  {character.image && (
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{character.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{character.ageGroup}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveCharacter(scene.id, character.id)}
                    className="text-muted-foreground hover:text-destructive p-1 h-auto"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border-2 border-dashed border-border rounded-lg bg-muted/30">
              <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">لم يتم اختيار شخصيات لهذا المشهد</p>
              <p className="text-xs text-muted-foreground mt-1">انقر "إضافة شخصية" لاختيار الشخصيات</p>
            </div>
          )}
        </div>

        {/* Character Selector Modal */}
        {showCharacterSelector && (
          <CharacterSelector
            heroes={heroes}
            selectedCharacters={scene.selectedCharacters}
            onSelectCharacter={(character) => {
              onAddCharacter(scene.id, character);
              setShowCharacterSelector(false);
            }}
            onClose={() => setShowCharacterSelector(false)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SceneCard;