---
template: content
title: "Installation & Setup"
---

# Installation & Setup

## 🚀 **Getting Started**

### **1. Download**

Visit [cursor.com](https://cursor.com) and download for your platform

### **2. Installation**

Standard application installation process

### **3. VS Code Migration**

Import extensions, settings, and themes automatically

### **4. Account Setup & AI Configuration**

```json
// Settings.json optimization for AI features
{
  "cursor.ai.model": "gpt-4",
  "cursor.ai.autocomplete": true,
  "cursor.ai.chatMode": "editor",
  "cursor.ai.maxTokens": 4000,
  "editor.inlineSuggest.enabled": true,
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  }
}
```

### **5. First Test - Verify AI Integration**

```bash
# Open terminal in Cursor
echo "Hello Cursor AI"

# Try this prompt: "Create a function that calculates fibonacci"
# You should see AI suggestions appear
```

<!-- Speaker Notes:
Now let's get our hands dirty. The setup process is straightforward, but there are a few optimization tips that will make a huge difference in your experience.

First, the installation is as simple as any other application. Visit cursor.com, download the installer for your platform, and install it like you would any other app.

Here's the beautiful part - if you're coming from VS Code, Cursor will offer to import all your extensions, settings, and themes. This isn't just copying files; it's a smart migration that ensures everything works properly in the AI-enhanced environment.

The account setup is crucial. This is where you'll configure your AI model preferences. You can choose between different models like GPT-4, Claude, and others. Each has different strengths, and you can switch between them based on your needs.

I'm showing you the optimal settings configuration here. These settings enable the most effective AI assistance:

- `cursor.ai.model` sets your preferred AI model - GPT-4 is excellent for complex reasoning
- `cursor.ai.autocomplete` enables real-time code suggestions
- `cursor.ai.chatMode` set to "editor" integrates chat directly in your coding environment
- `maxTokens` of 4000 gives you comprehensive responses
- The editor settings ensure you see AI suggestions immediately

The first test is critical. After setup, immediately verify that AI integration is working. Open a new file, start typing a function comment like "// Calculate fibonacci numbers" and you should see AI suggestions appear. If not, check your internet connection and account status.

**Pro Tip**: During setup, create a simple test project with a few different file types (JavaScript, Python, etc.) to verify AI suggestions work across all languages you'll be using.

**Common Setup Issues**:
- Proxy/firewall blocking AI requests
- Account not properly authenticated
- Extension conflicts from VS Code migration
- Regional restrictions on AI models

We'll troubleshoot any issues now before moving forward.
-->

## 🎯 **Setup Verification Checklist**

*Complete these steps to verify your installation:*

- [ ] **Download Complete**: Cursor installed and launched
- [ ] **VS Code Migration**: Extensions and settings imported
- [ ] **Account Active**: Signed in with AI access
- [ ] **Settings Applied**: AI configuration optimized
- [ ] **First Suggestion**: AI autocomplete working
- [ ] **Chat Available**: AI chat interface accessible

### **⚠️ Troubleshooting Quick Fixes**

- **No AI suggestions?** → Check internet connection & account status
- **Performance slow?** → Adjust `maxTokens` to 2000
- **Extensions missing?** → Manually reinstall critical ones
