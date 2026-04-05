export default async function handler(req, res) {
  // 1. Only allow "POST" requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 2. Extract contents and API Key
    const { contents } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API Key is missing on the server." });
    }

    // --- DYNAMIC MODEL DISCOVERY & FILTERING ---
    // Fetch all available models from Google to avoid "Not Found" errors
    const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const listData = await listResponse.json();

    if (!listData.models) {
      throw new Error("Could not retrieve model list from Google.");
    }

    // Filter out multimedia models (Veo, Lyria, Nano Banana) and keep text generators
    const textModels = listData.models.filter(m => {
      const name = m.name.toLowerCase();
      const description = m.description?.toLowerCase() || "";
      
      // Only keep models that support document/text analysis
      const supportsText = m.supportedGenerationMethods.includes('generateContent');

      // Identify and remove multimedia models
      const isMultimedia = name.includes('veo') ||     // Video
                           name.includes('lyria') ||   // Music
                           name.includes('banana') ||  // Images
                           description.includes('image generation') || 
                           description.includes('video generation');

      return supportsText && !isMultimedia;
    });

    // Select the "Best" model (Ideally Gemini 3 Flash for 2026)
    const selectedModel = textModels.find(m => m.name.includes('gemini-3-flash')) || 
                          textModels.find(m => m.name.includes('flash')) ||
                          textModels[0]; // Final fallback to any available text model

    if (!selectedModel) {
      throw new Error("No suitable text-based models found.");
    }

    // 3. THE PRIVATE CONVERSATION (Using the discovered model)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${selectedModel.name}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      }
    );

    const data = await response.json();

    // 4. SEND THE RESULT BACK
    res.status(200).json(data);

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      error: 'Failed to process legal scan', 
      details: error.message 
    });
  }
}