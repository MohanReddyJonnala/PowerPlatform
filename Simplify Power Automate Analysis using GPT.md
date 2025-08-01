# 💡 Simplify Flow Analysis

Tired of untangling complex Power Automate flows? Discover a smarter, faster way to analyze and document your logic using GPT and JSON extraction.

---

## Why You'll Love This Method

- ⏱️ **Saves Time**  
  Drastically cut down on the manual effort of clicking through each step.

- 🔍 **Improves Clarity**  
  Get a plain-English explanation of logic, conditions, and data paths.

- 🤝 **Smoother Collaboration**  
  Makes handovers and team reviews significantly more efficient.

- 🎓 **Better Onboarding**  
  Perfect for training new developers on existing or legacy flows.

---

## How to Analyze Your Flow

This section provides two ways to get your flow's underlying JSON definition.

---

### ✅ Standard Method: The Solution Export

1. **Add your Power Automate flow** into a Solution.
2. **Export the Solution** as a `.zip` file.
3. **Unzip** the file, go to `/Workflows/` folder, and open the `.json` file.
4. **Copy the JSON** and paste it into GPT with this prompt:  
   _“Explain the logic of this Power Automate flow step by step.”_
5. **Receive a clean, readable analysis** of your flow's logic!

---

### 🚀 Advanced Method: Direct API Query

If you're an admin/maker, use the Dataverse Web API to extract JSON:

```plaintext
https://<your-org>.crm.dynamics.com/api/data/v9.2/workflows?$filter=category eq 5 and workflowid eq <flow-id>
