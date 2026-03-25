# scribe

Static site generator for electronics/build posts on ulfmag.net. Sister tool to [giraffe](https://github.com/ulfmagnetics/giraffe).

## Setup

```sh
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

## Adding a post

1. Create `posts/<slug>.md` with YAML front matter:

```markdown
---
title: "Your Post Title"
date: 2026-04-01
hero: posts/<slug>/hero.jpg
summary: "One-sentence description."
featured: true
repo: https://github.com/ulfmagnetics/your-repo   # optional
---

Post body in Markdown...
```

2. Drop any images into `posts/<slug>/` (hero image must match the `hero:` path).

3. Run:

```sh
python scribe.py
```

This generates `posts/<slug>/index.html` and updates `index.html`. If `featured: true`, this post becomes the hero; any previous featured post drops to a card. Only one hero at a time — the most-recent featured post wins.

4. Commit and push:

```sh
git add . && git commit -m "Add <slug> post" && git push
```
