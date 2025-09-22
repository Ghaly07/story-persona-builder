import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Wand2, Save, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeroData {
  name: string;
  gender: string;
  ageGroup: string;
  style: string;
  description: string;
  imageModel: string;
  textModel: string;
}

interface HeroCreatorProps {
  onSaveHero: (hero: HeroData & { id: string; image?: string }) => void;
}

const HeroCreator = ({ onSaveHero }: HeroCreatorProps) => {
  const { toast } = useToast();
  const [heroData, setHeroData] = useState<HeroData>({
    name: "",
    gender: "",
    ageGroup: "",
    style: "",
    description: "",
    imageModel: "flux-realism",
    textModel: "flux-plus"
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: keyof HeroData, value: string) => {
    setHeroData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!heroData.name || !heroData.description) {
      toast({
        title: "معلومات ناقصة",
        description: "يرجى إدخال اسم الشخصية ووصفها على الأقل",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      toast({
        title: "تم إنشاء الشخصية!",
        description: "تم إنشاء شخصيتك بنجاح"
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    if (!heroData.name) {
      toast({
        title: "اسم مطلوب",
        description: "يرجى إدخال اسم الشخصية",
        variant: "destructive"
      });
      return;
    }

    const newHero = {
      ...heroData,
      id: Date.now().toString(),
      image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000) + 1500000000000}-${Math.floor(Math.random() * 100000)}?w=400&h=400&fit=crop&crop=face`
    };

    onSaveHero(newHero);
    
    // Reset form
    setHeroData({
      name: "",
      gender: "",
      ageGroup: "",
      style: "",
      description: "",
      imageModel: "flux-realism",
      textModel: "flux-plus"
    });

    toast({
      title: "تم حفظ الشخصية!",
      description: "تمت إضافة الشخصية إلى مكتبتك"
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card hover:shadow-float transition-smooth animate-scale-in">
      <CardHeader className="text-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle opacity-50"></div>
        <div className="relative">
          <div className="w-12 h-12 gradient-hero rounded-full flex items-center justify-center mx-auto mb-3 animate-float">
            <User className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground mb-2">
            إنشاء شخصية جديدة
          </CardTitle>
          <p className="text-muted-foreground">أنشئ شخصيات فريدة لقصصك المصورة</p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hero-name" className="text-sm font-medium">اسم الشخصية</Label>
            <Input
              id="hero-name"
              placeholder="أدخل اسم الشخصية"
              value={heroData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-background border-border focus:border-primary transition-smooth"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender" className="text-sm font-medium">الجنس</Label>
            <Select value={heroData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
              <SelectTrigger className="bg-background border-border focus:border-primary">
                <SelectValue placeholder="اختر الجنس" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">ذكر</SelectItem>
                <SelectItem value="female">أنثى</SelectItem>
                <SelectItem value="other">آخر</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age-group" className="text-sm font-medium">الفئة العمرية</Label>
            <Input
              id="age-group"
              placeholder="مثال: طفل، مراهق، بالغ"
              value={heroData.ageGroup}
              onChange={(e) => handleInputChange("ageGroup", e.target.value)}
              className="bg-background border-border focus:border-primary transition-smooth"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="style" className="text-sm font-medium">الأسلوب (اختياري)</Label>
            <Input
              id="style"
              placeholder="مثال: كرتوني، واقعي، أنيمي"
              value={heroData.style}
              onChange={(e) => handleInputChange("style", e.target.value)}
              className="bg-background border-border focus:border-primary transition-smooth"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="photo" className="text-sm font-medium">الصورة</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-smooth cursor-pointer bg-muted/30">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">اختر ملف أو اسحبه هنا</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG حتى 10MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="image-model" className="text-sm font-medium">نموذج الصورة</Label>
            <Select value={heroData.imageModel} onValueChange={(value) => handleInputChange("imageModel", value)}>
              <SelectTrigger className="bg-background border-border focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flux-realism">Flux Realism</SelectItem>
                <SelectItem value="flux-anime">Flux Anime</SelectItem>
                <SelectItem value="flux-cartoon">Flux Cartoon</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="text-model" className="text-sm font-medium">نموذج النص</Label>
            <Select value={heroData.textModel} onValueChange={(value) => handleInputChange("textModel", value)}>
              <SelectTrigger className="bg-background border-border focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flux-plus">Flux Plus</SelectItem>
                <SelectItem value="flux-standard">Flux Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">وصف الشخصية</Label>
          <Textarea
            id="description"
            placeholder="اكتب وصفاً تفصيلياً للشخصية: الشعر، الملابس، الشخصية، الإكسسوارات..."
            value={heroData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            className="bg-background border-border focus:border-primary transition-smooth resize-none"
          />
          <p className="text-xs text-muted-foreground">
            إذا قمت برفع صورة أعلاه، فسيتم استخدام الصورة كمرجع تلقائياً. بدون صورة، سيتم استخدام الوصف النصي.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !heroData.name || !heroData.description}
            className="flex-1 gradient-hero text-white hover:shadow-hero transition-smooth disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                جاري الإنشاء...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                إنشاء الشخصية
              </>
            )}
          </Button>
          
          <Button
            onClick={handleSave}
            variant="outline"
            disabled={!heroData.name}
            className="bg-secondary hover:bg-secondary/80 border-border hover:border-primary transition-smooth"
          >
            <Save className="w-4 h-4 mr-2" />
            حفظ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroCreator;