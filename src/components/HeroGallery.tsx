import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeroCard from "./HeroCard";
import { Search, Filter, Grid3X3, Grid2X2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Hero {
  id: string;
  name: string;
  gender: string;
  ageGroup: string;
  style: string;
  description: string;
  image?: string;
}

interface HeroGalleryProps {
  heroes: Hero[];
  onUseHero: (hero: Hero) => void;
  onEditHero: (hero: Hero) => void;
  onDeleteHero: (heroId: string) => void;
  onDuplicateHero: (hero: Hero) => void;
}

const HeroGallery = ({ heroes, onUseHero, onEditHero, onDeleteHero, onDuplicateHero }: HeroGalleryProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [gridColumns, setGridColumns] = useState(4);

  const filteredHeroes = heroes.filter(hero => {
    const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hero.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = !filterGender || hero.gender === filterGender;
    return matchesSearch && matchesGender;
  });

  const handleUseHero = (hero: Hero) => {
    toast({
      title: "تم اختيار الشخصية",
      description: `تم اختيار ${hero.name} لاستخدامها في القصة`
    });
    onUseHero(hero);
  };

  const toggleGridSize = () => {
    setGridColumns(prev => prev === 4 ? 3 : prev === 3 ? 2 : 4);
  };

  const getGridClass = () => {
    switch (gridColumns) {
      case 2: return "grid-cols-1 sm:grid-cols-2";
      case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  if (heroes.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="w-24 h-24 gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
          <Users className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">لا توجد شخصيات بعد</h3>
        <p className="text-muted-foreground mb-6">ابدأ بإنشاء شخصيتك الأولى للقصص المصورة</p>
        <div className="w-32 h-1 gradient-hero rounded-full mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            مكتبة الشخصيات
          </h2>
          <p className="text-muted-foreground mt-1">
            {heroes.length} شخصية • {filteredHeroes.length} معروضة
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleGridSize}
            className="bg-background hover:bg-muted transition-smooth"
          >
            {gridColumns === 4 ? <Grid3X3 className="w-4 h-4" /> :
             gridColumns === 3 ? <Grid2X2 className="w-4 h-4" /> :
             <Grid3X3 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="البحث في الشخصيات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border focus:border-primary transition-smooth"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={filterGender === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterGender("")}
            className={filterGender === "" ? "gradient-hero text-white" : ""}
          >
            الكل
          </Button>
          <Button
            variant={filterGender === "male" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterGender("male")}
            className={filterGender === "male" ? "gradient-hero text-white" : ""}
          >
            ذكور
          </Button>
          <Button
            variant={filterGender === "female" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterGender("female")}
            className={filterGender === "female" ? "gradient-hero text-white" : ""}
          >
            إناث
          </Button>
        </div>
      </div>

      {/* Results Count */}
      {searchTerm && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {filteredHeroes.length} نتيجة للبحث "{searchTerm}"
          </Badge>
        </div>
      )}

      {/* Heroes Grid */}
      {filteredHeroes.length > 0 ? (
        <div className={`grid gap-6 ${getGridClass()}`}>
          {filteredHeroes.map((hero, index) => (
            <div 
              key={hero.id} 
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-slide-up"
            >
              <HeroCard
                hero={hero}
                onUse={handleUseHero}
                onEdit={onEditHero}
                onDelete={onDeleteHero}
                onDuplicate={onDuplicateHero}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">لا توجد نتائج</h3>
          <p className="text-muted-foreground">جرب كلمات بحث أخرى أو قم بتغيير الفلاتر</p>
        </div>
      )}
    </div>
  );
};

export default HeroGallery;