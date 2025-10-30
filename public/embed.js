(function() {
  // Default configuration
  const defaultConfig = {
    webhookUrl: 'https://ai.nagpurnmc.in/webhook/15cffe6a-0d7a-4da5-82a4-4242957dc2e1/chat',
    greeting: 'Welcome to Nagpur Municipal Corporation 👋\\nHow can I help you today?',
    sessionId: 'session-' + Date.now(),
    embedUrl: 'https://d3353be7-8651-4efc-8221-95fa234a15ea.lovableproject.com/chatbot-embed'
  };

  // Get configuration from script tag attributes
  const scriptTag = document.currentScript;
  const config = {
    webhookUrl: scriptTag.getAttribute('data-webhook-url') || defaultConfig.webhookUrl,
    greeting: scriptTag.getAttribute('data-greeting') || defaultConfig.greeting,
    sessionId: scriptTag.getAttribute('data-session-id') || defaultConfig.sessionId,
    embedUrl: scriptTag.getAttribute('data-embed-url') || defaultConfig.embedUrl
  };

  // Build iframe URL with parameters
  const params = new URLSearchParams({
    webhookUrl: config.webhookUrl,
    greeting: config.greeting,
    sessionId: config.sessionId
  });

  // Create iframe element
  const iframe = document.createElement('iframe');
  iframe.src = config.embedUrl + '?' + params.toString();
  iframe.style.cssText = 'position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 999999; pointer-events: none;';
  iframe.id = 'nmc-chatbot-iframe';
  iframe.allow = 'clipboard-read; clipboard-write';

  // Enable pointer events on the iframe when chatbot is open
  window.addEventListener('message', function(event) {
    if (event.data.type === 'chatbot-ready') {
      iframe.style.pointerEvents = 'auto';
    }
  });

  // Append iframe to body when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.appendChild(iframe);
    });
  } else {
    document.body.appendChild(iframe);
  }
})();
