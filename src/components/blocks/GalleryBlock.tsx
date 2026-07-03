import { GalleryBlockData } from "@/lib/blocks/schemas";

interface GalleryBlockProps {
  data: GalleryBlockData;
}

export function GalleryBlock({ data }: GalleryBlockProps) {
  // Simple masonry-like or grid layout
  return (
    <section className="py-24 px-4 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center font-serif text-4xl md:text-5xl text-primary mb-16">{data.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.images.map((img) => (
            <div 
              key={img.id} 
              className="relative group overflow-hidden rounded-2xl bg-secondary/20 shadow-sm"
              style={{
                // If using a true CSS grid, we could apply rowSpan/colSpan here.
                // For simplicity in Tailwind, we'll just let them fit the columns naturally,
                // or we could add classes based on img.colSpan/rowSpan.
              }}
            >
              <img 
                src={img.url} 
                alt={img.caption || "Gallery Image"} 
                className="w-full h-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-serif text-lg">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
