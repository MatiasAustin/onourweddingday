import { StoryBlockData } from "@/lib/blocks/schemas";

interface StoryBlockProps {
  data: StoryBlockData;
}

export function StoryBlock({ data }: StoryBlockProps) {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center font-serif text-4xl md:text-5xl text-primary mb-16">{data.title}</h2>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-secondary/80"></div>
          
          <div className="space-y-24">
            {data.events.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={event.id} className="relative flex items-center justify-between w-full">
                  
                  {/* Left Side (Content for Even, Empty for Odd) */}
                  <div className={`w-5/12 ${isEven ? 'text-right' : ''}`}>
                    {isEven && (
                      <div>
                        <div className="text-sm font-bold text-primary mb-2 uppercase tracking-widest">{event.date}</div>
                        <h3 className="font-serif text-2xl text-foreground mb-3">{event.title}</h3>
                        <p className="text-foreground/70 leading-relaxed">{event.description}</p>
                      </div>
                    )}
                    {!isEven && event.imageUrl && (
                      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ml-auto max-w-sm">
                        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  
                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 shadow-sm"></div>
                  
                  {/* Right Side (Empty for Even, Content for Odd) */}
                  <div className="w-5/12">
                    {!isEven && (
                      <div>
                        <div className="text-sm font-bold text-primary mb-2 uppercase tracking-widest">{event.date}</div>
                        <h3 className="font-serif text-2xl text-foreground mb-3">{event.title}</h3>
                        <p className="text-foreground/70 leading-relaxed">{event.description}</p>
                      </div>
                    )}
                    {isEven && event.imageUrl && (
                      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mr-auto max-w-sm">
                        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
