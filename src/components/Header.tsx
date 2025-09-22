import { Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 animate-fade-in">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center shadow-card animate-glow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                StoryHero
              </h1>
              <p className="text-sm text-muted-foreground">إنشاء الشخصيات للقصص المصورة</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            <Users className="w-4 h-4 mr-2" />
            العودة للإنشاء
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;