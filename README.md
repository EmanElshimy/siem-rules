# SIEM Detection Rules Catalog

A publicly accessible catalog of practical SIEM detection rules, focused on **Elastic Security** (KQL, EQL, ES|QL) with examples adaptable to other platforms.

Each rule includes:
- Description
- What type of attack / MITRE ATT&CK technique it detects
- Benefits of the detection
- Ready-to-use query
- 1–2 sample result rows (realistic log events)

## Live Demo

This is a static site. To publish a real public link:

### Option 1: GitHub Pages (Recommended)
1. Create a new GitHub repository (public).
2. Upload all files from this folder to the repo root.
3. Go to **Settings → Pages**.
4. Source: Deploy from branch → `main` / `/ (root)`.
5. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### Option 2: Netlify / Vercel
- Drag-and-drop the folder onto [Netlify Drop](https://app.netlify.com/drop) or connect a Git repo.
- Instant public URL.

## Project Structure

```
├── index.html          # Main page
├── styles.css          # Styling
├── app.js              # Interactive logic
├── rules.json          # All detection rules + samples
├── README.md
└── LICENSE
```

## Adding More Rules

Edit `rules.json` and add objects following the existing schema:

```json
{
  "id": "rule-021",
  "name": "Your Rule Name",
  "category": "Category",
  "platform": "Windows",
  "mitre": "TXXXX - Technique Name",
  "severity": "High",
  "description": "...",
  "what_it_detects": "...",
  "benefits": "...",
  "query": "your KQL or EQL query",
  "query_language": "KQL",
  "sample_results": [ { ... }, { ... } ]
}
```

## Disclaimer

These rules are educational examples. Always:
- Validate queries in a lab or staging environment
- Tune thresholds and exclusions for your environment
- Review false positive rates
- Map to your specific log sources (Winlogbeat, Elastic Agent, Sysmon, CloudTrail, etc.)

Inspired by the open Elastic Detection Rules project and the broader detection engineering community.

## License

MIT License – free to use, modify, and share.
