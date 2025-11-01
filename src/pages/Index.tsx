const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">NMC AI Chatbot</h1>
        <p className="text-muted-foreground mb-6">
          Embed this chatbot on your website using the iframe URL
        </p>
        <a 
          href="/chatbot-embed" 
          className="text-primary hover:underline"
        >
          View Chatbot Embed →
        </a>
      </div>
    </div>
  );
};

export default Index;
