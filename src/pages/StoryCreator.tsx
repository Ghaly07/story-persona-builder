import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, X, Users, Wand2, Save, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CharacterSelector from "@/components/CharacterSelector";
import SceneCard from "@/components/SceneCard";

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

interface StoryCreatorProps {
  heroes: Hero[];
  onBack: () => void;
}

const StoryCreator = ({ heroes, onBack }: StoryCreatorProps) => {
  const { toast } = useToast();
  const [storyData, setStoryData] = useState({
    title: "",
    description: "",
    genre: "",
    ageTarget: ""
  });

  const [scenes, setScenes] = useState<Scene[]>([
    { id: "1", title: "المشهد الأول", description: "", selectedCharacters: [] }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);

  const addScene = () => {
    const newScene: Scene = {
      id: Date.now().toString(),
      title: `المشهد ${scenes.length + 1}`,
      description: "",
      selectedCharacters: []
    };
    setScenes(prev => [...prev, newScene]);
  };

  const removeScene = (sceneId: string) => {
    if (scenes.length > 1) {
      setScenes(prev => prev.filter(scene => scene.id !== sceneId));
    }
  };

  const updateScene = (sceneId: string, field: string, value: string) => {
    setScenes(prev => prev.map(scene => 
      scene.id === sceneId ? { ...scene, [field]: value } : scene
    ));
  };

  const addCharacterToScene = (sceneId: string, character: Hero) => {
    setScenes(prev => prev.map(scene => {
      if (scene.id === sceneId) {
        if (!scene.selectedCharacters.find(c => c.id === character.id)) {
          return { ...scene, selectedCharacters: [...scene.selectedCharacters, character] };
        }
      }
      return scene;
    }));
  };

  const removeCharacterFromScene = (sceneId: string, characterId: string) => {
    setScenes(prev => prev.map(scene => 
      scene.id === sceneId 
        ? { ...scene, selectedCharacters: scene.selectedCharacters.filter(c => c.id !== characterId) }
        : scene
    ));
  };

  const handleGenerate = async () => {
    if (!storyData.title || scenes.some(scene => !scene.description)) {
      toast({
        title: "معلومات ناقصة",
        description: "يرجى إكمال جميع المعلومات المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      toast({
        title: "تم إنشاء القصة!",
        description: "تم إنشاء قصتك المصورة بنجاح"
      });
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="bg-background hover:bg-muted transition-smooth"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة
            </Button>
            
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                إنشاء قصة مصورة
              </h1>
              <p className="text-muted-foreground mt-1">أنشئ قصتك الخاصة باستخدام شخصياتك المفضلة</p>
            </div>
          </div>

          {/* Story Info */}
          <Card className="mb-8 shadow-card">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">معلومات القصة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="story-title">عنوان القصة</Label>
                  <Input
                    id="story-title"
                    placeholder="أدخل عنوان القصة"
                    value={storyData.title}
                    onChange={(e) => setStoryData(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-background border-border focus:border-primary transition-smooth"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="genre">النوع</Label>
                  <Select value={storyData.genre} onValueChange={(value) => setStoryData(prev => ({ ...prev, genre: value }))}>
                    <SelectTrigger className="bg-background border-border focus:border-primary">
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adventure">مغامرة</SelectItem>
                      <SelectItem value="comedy">كوميديا</SelectItem>
                      <SelectItem value="drama">دراما</SelectItem>
                      <SelectItem value="fantasy">خيال</SelectItem>
                      <SelectItem value="education">تعليمي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="story-description">وصف القصة</Label>
                <Textarea
                  id="story-description"
                  placeholder="اكتب وصفاً مختصراً للقصة..."
                  value={storyData.description}
                  onChange={(e) => setStoryData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-background border-border focus:border-primary transition-smooth resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Scenes */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">مشاهد القصة</h2>
              <Button
                onClick={addScene}
                size="sm"
                className="gradient-hero text-white hover:shadow-hero transition-smooth"
              >
                <Plus className="w-4 h-4 mr-2" />
                إضافة مشهد
              </Button>
            </div>

            {scenes.map((scene, index) => (
              <SceneCard
                key={scene.id}
                scene={scene}
                sceneNumber={index + 1}
                heroes={heroes}
                canDelete={scenes.length > 1}
                onUpdateScene={updateScene}
                onRemoveScene={removeScene}
                onAddCharacter={addCharacterToScene}
                onRemoveCharacter={removeCharacterFromScene}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-8">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !storyData.title}
              className="flex-1 gradient-hero text-white hover:shadow-hero transition-smooth disabled:opacity-50"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  جاري إنشاء القصة...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  إنشاء القصة المصورة
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="bg-secondary hover:bg-secondary/80 border-border hover:border-primary transition-smooth"
            >
              <Save className="w-4 h-4 mr-2" />
              حفظ كمسودة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCreator;