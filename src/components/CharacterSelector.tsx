import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Users, X } from "lucide-react";

interface Hero {
  id: string;
  name: string;
  gender: string;
  ageGroup: string;
  style: string;
  description: string;
  image?: string;
}

interface CharacterSelectorProps {
  heroes: Hero[];
  selectedCharacters: Hero[];
  onSelectCharacter: (character: Hero) => void;
  onClose: () => void;
}

const CharacterSelector = ({ heroes, selectedCharacters, onSelectCharacter, onClose }: CharacterSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("");

  const filteredHeroes = heroes.filter(hero => {
    const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hero.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = !filterGender || hero.gender === filterGender;
    const isNotSelected = !selectedCharacters.find(c => c.id === hero.id);
    return matchesSearch && matchesGender && isNotSelected;
  });

  if (heroes.length === 0) {
    return (
      <Dialog open onOpenChange={() => onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">لا توجد شخصيات</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">لم تقم بإنشاء أي شخصيات بعد</p>
            <Button onClick={onClose} className="gradient-hero text-white">
              إنشاء شخصية جديدة
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            اختيار الشخصيات
          </DialogTitle>
        </DialogHeader>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 py-4">
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

        {/* Characters Grid */}
        <div className="flex-1 overflow-y-auto">
          {filteredHeroes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
              {filteredHeroes.map((hero) => (
                <div
                  key={hero.id}
                  onClick={() => onSelectCharacter(hero)}
                  className="flex items-start gap-3 p-3 border border-border rounded-lg hover:border-primary hover:shadow-sm transition-smooth cursor-pointer bg-card hover:bg-accent/50"
                >
                  {hero.image && (
                    <img
                      src={hero.image}
                      alt={hero.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground mb-1 truncate">{hero.name}</h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                        {hero.ageGroup}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-secondary/10 text-secondary-foreground border-secondary/20">
                        {hero.gender === "male" ? "ذكر" : hero.gender === "female" ? "أنثى" : "آخر"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{hero.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-medium text-foreground mb-2">لا توجد نتائج</h3>
              <p className="text-sm text-muted-foreground">جرب كلمات بحث أخرى أو قم بتغيير الفلاتر</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterSelector;