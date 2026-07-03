export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-8 text-center">Contact Us</h1>
      <div className="bg-white p-8 rounded-2xl border border-secondary/50 shadow-sm max-w-2xl mx-auto">
        <p className="text-foreground/80 mb-6 text-center">
          Have a question or need support with your invitation? We'd love to help!
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Name</label>
            <input type="text" className="w-full px-4 py-2 border border-secondary/50 rounded-lg focus:ring-primary focus:border-primary" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-secondary/50 rounded-lg focus:ring-primary focus:border-primary" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Message</label>
            <textarea rows={4} className="w-full px-4 py-2 border border-secondary/50 rounded-lg focus:ring-primary focus:border-primary" placeholder="How can we help you?"></textarea>
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-light transition-colors">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
