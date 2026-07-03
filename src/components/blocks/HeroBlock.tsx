import { HeroBlockData } from "@/lib/blocks/schemas";

interface HeroBlockProps {
  data: HeroBlockData;
}

export function HeroBlock({ data }: HeroBlockProps) {
  if (data.layoutStyle === "oval-mask") {
    return (
      <section className="relative w-full min-h-[80vh] flex items-center justify-center py-20 px-4 overflow-hidden">
        {/* Background Blur */}
        <div className="absolute inset-0 -z-10 bg-secondary/20"></div>
        
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="w-64 h-96 md:w-80 md:h-[450px] rounded-[200px] overflow-hidden mb-10 border-[12px] border-white/80 shadow-2xl relative">
            <img 
              src={data.primaryImageUrl} 
              alt={data.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary font-medium mb-4">
            {data.title}
          </h1>
          
          {data.subtitle && (
            <p className="text-xl md:text-2xl text-foreground/80 font-serif italic mb-6">
              {data.subtitle}
            </p>
          )}
          
          {data.date && (
            <div className="mt-8 tracking-[0.2em] text-sm uppercase text-foreground/60 border-t border-b border-foreground/20 py-4 px-8 inline-block">
              {data.date}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Fallback centered layout
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={data.primaryImageUrl} 
          alt={data.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4">
        {data.subtitle && <p className="text-xl md:text-2xl font-serif italic mb-4">{data.subtitle}</p>}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 drop-shadow-lg">
          {data.title}
        </h1>
        {data.date && (
          <p className="text-lg uppercase tracking-[0.3em] font-medium drop-shadow-md">
            {data.date}
          </p>
        )}
      </div>
    </section>
  );
}
