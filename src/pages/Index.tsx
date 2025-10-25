import { Chatbot } from "@/components/chatbot/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Nagpur Municipal Corporation
            </h1>
            <p className="text-xl text-muted-foreground">
              नागपूर महानगरपालिका
            </p>
          </div>

          {/* Quick Links Section */}
          <nav className="flex flex-wrap justify-center gap-3 mt-8" aria-label="Quick service links">
            <a 
              href="https://nagpurnmc.in/property-tax" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full font-medium transition-colors border border-primary/20"
            >
              Property Tax
            </a>
            <a 
              href="https://nagpurnmc.in/water-supply" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full font-medium transition-colors border border-primary/20"
            >
              Water Supply
            </a>
            <a 
              href="https://nagpurnmc.in/grievance" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full font-medium transition-colors border border-primary/20"
            >
              Grievance
            </a>
            <a 
              href="https://wa.me/your-whatsapp-number" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full font-medium transition-colors border border-primary/20"
            >
              WhatsApp Chatbot
            </a>
            <a 
              href="https://nagpurnmc.in/right-to-services" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full font-medium transition-colors border border-primary/20"
            >
              Right to Services
            </a>
          </nav>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
              <div className="text-4xl mb-3">💧</div>
              <h3 className="font-semibold mb-2">Water Services</h3>
              <p className="text-sm text-muted-foreground">
                Pay bills, check connections, report issues
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
              <div className="text-4xl mb-3">🏘️</div>
              <h3 className="font-semibold mb-2">Property Tax</h3>
              <p className="text-sm text-muted-foreground">
                View assessments, make payments online
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-semibold mb-2">Complaints</h3>
              <p className="text-sm text-muted-foreground">
                Register and track civic complaints
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
            <h2 className="text-2xl font-semibold mb-3 flex items-center justify-center gap-2">
              <span>💬</span> Need Help?
            </h2>
            <p className="text-muted-foreground mb-4">
              Ask our AI assistant about municipal services, bills, or any queries.
              Click the chat icon in the bottom-right corner to get started!
            </p>
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  );
};

export default Index;
