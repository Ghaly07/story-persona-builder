import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wand2, 
  Users, 
  BookOpen, 
  Palette, 
  Sparkles, 
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";

interface StoryProgressModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: number;
  color: string;
}

const progressSteps: ProgressStep[] = [
  {
    id: "analyze",
    title: "تحليل الشخصيات",
    description: "جاري تحليل شخصيات القصة وخصائصها",
    icon: <Users className="w-5 h-5" />,
    duration: 1000,
    color: "bg-blue-500"
  },
  {
    id: "structure",
    title: "بناء هيكل القصة",
    description: "إنشاء الهيكل العام للقصة والمشاهد",
    icon: <BookOpen className="w-5 h-5" />,
    duration: 1500,
    color: "bg-purple-500"
  },
  {
    id: "design",
    title: "تصميم المشاهد",
    description: "تصميم المشاهد البصرية وتحديد الألوان",
    icon: <Palette className="w-5 h-5" />,
    duration: 2000,
    color: "bg-pink-500"
  },
  {
    id: "generate",
    title: "إنتاج الصور",
    description: "توليد الصور الفنية للشخصيات والمشاهد",
    icon: <Sparkles className="w-5 h-5" />,
    duration: 2500,
    color: "bg-emerald-500"
  },
  {
    id: "finalize",
    title: "اللمسة الأخيرة",
    description: "تجميع العناصر وإنتاج القصة النهائية",
    icon: <Zap className="w-5 h-5" />,
    duration: 1000,
    color: "bg-orange-500"
  }
];

const StoryProgressModal = ({ isOpen, onComplete }: StoryProgressModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(0);
      setCompletedSteps(new Set());
      return;
    }

    let stepTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    const runStep = (stepIndex: number) => {
      if (stepIndex >= progressSteps.length) {
        setProgress(100);
        setTimeout(() => {
          onComplete();
        }, 500);
        return;
      }

      setCurrentStep(stepIndex);
      const step = progressSteps[stepIndex];
      const startProgress = (stepIndex / progressSteps.length) * 100;
      const endProgress = ((stepIndex + 1) / progressSteps.length) * 100;
      
      let currentProgress = startProgress;
      const increment = (endProgress - startProgress) / (step.duration / 50);

      progressTimer = setInterval(() => {
        currentProgress += increment;
        if (currentProgress >= endProgress) {
          currentProgress = endProgress;
          clearInterval(progressTimer);
          setCompletedSteps(prev => new Set([...prev, stepIndex]));
          
          stepTimer = setTimeout(() => {
            runStep(stepIndex + 1);
          }, 300);
        }
        setProgress(Math.min(currentProgress, 100));
      }, 50);
    };

    runStep(0);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
    };
  }, [isOpen, onComplete]);

  const currentStepData = progressSteps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md bg-card border-border shadow-xl">
        <div className="space-y-6 p-4">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 gradient-hero rounded-full flex items-center justify-center mb-4">
              <Wand2 className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-foreground">جاري إنشاء قصتك المصورة</h3>
            <p className="text-sm text-muted-foreground">اكتشف كيف تتحول أفكارك إلى قصة رائعة</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">
                {Math.round(progress)}%
              </span>
              <Badge variant="outline" className="text-xs">
                {currentStep + 1} من {progressSteps.length}
              </Badge>
            </div>
            
            <div className="relative">
              <Progress 
                value={progress} 
                className="h-3 bg-secondary/50"
              />
              {/* Animated glow effect */}
              <div 
                className="absolute top-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full transition-all duration-300"
                style={{
                  width: '20%',
                  left: `${Math.max(0, progress - 10)}%`,
                  opacity: progress > 0 && progress < 100 ? 1 : 0
                }}
              />
            </div>
          </div>

          {/* Current Step */}
          {currentStepData && (
            <Card className="border-border/50 bg-background/50 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${currentStepData.color} rounded-xl flex items-center justify-center text-white`}>
                    {currentStepData.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      {currentStepData.title}
                      {completedSteps.has(currentStep) ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground animate-pulse" />
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {currentStepData.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Steps Overview */}
          <div className="grid grid-cols-5 gap-2">
            {progressSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center space-y-1 transition-all duration-300 ${
                  completedSteps.has(index) 
                    ? 'opacity-100' 
                    : index === currentStep 
                    ? 'opacity-80' 
                    : 'opacity-40'
                }`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                    completedSteps.has(index) 
                      ? 'bg-emerald-500 text-white' 
                      : index === currentStep
                      ? `${step.color} text-white animate-pulse`
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {completedSteps.has(index) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span className="text-xs text-center text-muted-foreground leading-tight">
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryProgressModal;