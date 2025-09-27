import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import HeroCreator from "@/components/HeroCreator";
import HeroGallery from "@/components/HeroGallery";
import StoryCreator from "./StoryCreator";
import { Plus, Users, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SideCharacter {
  id: string;
  name: string;
  description: string;
  image?: string;
}

interface Hero {
  id: string;
  name: string;
  gender: string;
  ageGroup: string;
  style: string;
  description: string;
  image?: string;
  sideCharacters?: SideCharacter[];
}

const Index = () => {
  const { toast } = useToast();
  const [heroes, setHeroes] = useState<Hero[]>([
    {
      id: "1",
      name: "فرح",
      gender: "female",
      ageGroup: "طفلة",
      style: "كرتوني",
      description: "طفلة صغيرة مرحة تحب المغامرات والاستكشاف",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      sideCharacters: [
        {
          id: "1-1",
          name: "قطقوط",
          description: "قطة فرح المفضلة",
          image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop&crop=face"
        },
        {
          id: "1-2",
          name: "عبود",
          description: "صديق فرح المقرب",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop&crop=face"
        }
      ]
    },
    {
      id: "2", 
      name: "دادا",
      gender: "male",
      ageGroup: "رضيع",
      style: "كرتوني",
      description: "طفل صغير لطيف يرتدي ملابس زرقاء",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&crop=face",
      sideCharacters: [
        {
          id: "2-1",
          name: "دبدوبة",
          description: "لعبة دادا المفضلة",
          image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop&crop=center"
        }
      ]
    },
    {
      id: "3",
      name: "سارة",
      gender: "female", 
      ageGroup: "مراهقة",
      style: "واقعي",
      description: "مراهقة ذكية ومتفوقة في دراستها",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      sideCharacters: [
        {
          id: "3-1",
          name: "نور",
          description: "أفضل صديقة لسارة",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
        }
      ]
    },
    {
      id: "4",
      name: "سوسو",
      gender: "female",
      ageGroup: "شابة",
      style: "عصري",
      description: "شابة عصرية تحب السفر والتصوير",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face"
    }
  ]);

  const [activeTab, setActiveTab] = useState("gallery");
  const [showStoryCreator, setShowStoryCreator] = useState(false);

  const handleSaveHero = (hero: Hero) => {
    setHeroes(prev => [...prev, hero]);
    setActiveTab("gallery");
  };

  const handleUseHero = (hero: Hero) => {
    setShowStoryCreator(true);
    toast({
      title: "تم اختيار الشخصية!",
      description: `تم اختيار ${hero.name} للاستخدام في القصة المصورة`
    });
  };

  const handleEditHero = (hero: Hero) => {
    toast({
      title: "قريباً",
      description: "ميزة التعديل ستكون متاحة قريباً"
    });
  };

  const handleDeleteHero = (heroId: string) => {
    setHeroes(prev => prev.filter(h => h.id !== heroId));
    toast({
      title: "تم حذف الشخصية",
      description: "تم حذف الشخصية بنجاح"
    });
  };

  const handleDuplicateHero = (hero: Hero) => {
    const duplicatedHero = {
      ...hero,
      id: Date.now().toString(),
      name: `${hero.name} - نسخة`
    };
    setHeroes(prev => [...prev, duplicatedHero]);
    toast({
      title: "تم نسخ الشخصية",
      description: `تم إنشاء نسخة من ${hero.name}`
    });
  };

  if (showStoryCreator) {
    return (
      <StoryCreator 
        heroes={heroes} 
        onBack={() => setShowStoryCreator(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <button
              onClick={() => setShowStoryCreator(true)}
              className="gradient-hero text-white px-6 py-3 rounded-lg hover:shadow-hero transition-smooth flex items-center gap-2 mx-auto mb-6"
            >
              <BookOpen className="w-5 h-5" />
              إنشاء قصة مصورة
            </button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-card/50 backdrop-blur-sm shadow-card">
              <TabsTrigger 
                value="gallery" 
                className="flex items-center gap-2 data-[state=active]:gradient-hero data-[state=active]:text-white transition-smooth"
              >
                <Users className="w-4 h-4" />
                مكتبة الشخصيات
              </TabsTrigger>
              <TabsTrigger 
                value="create"
                className="flex items-center gap-2 data-[state=active]:gradient-hero data-[state=active]:text-white transition-smooth"
              >
                <Plus className="w-4 h-4" />
                إنشاء جديد
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gallery" className="mt-6">
              <HeroGallery
                heroes={heroes}
                onUseHero={handleUseHero}
                onEditHero={handleEditHero}
                onDeleteHero={handleDeleteHero}
                onDuplicateHero={handleDuplicateHero}
              />
            </TabsContent>

            <TabsContent value="create" className="mt-6">
              <HeroCreator onSaveHero={handleSaveHero} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;