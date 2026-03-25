#!/usr/bin/env python3
"""
scribe.py — static site generator for ulfmagnetics.github.io posts.

Usage: python scribe.py
       Reads posts/*.md, renders posts/<slug>/index.html, updates index.html.
"""

import os
import re
import datetime
from pathlib import Path

import yaml
import markdown
from jinja2 import Environment, FileSystemLoader

SITE_ROOT = Path(__file__).parent
POSTS_DIR = SITE_ROOT / "posts"
TEMPLATES_DIR = SITE_ROOT / "templates"
INDEX_HTML = SITE_ROOT / "index.html"

SCRIBE_START = "<!-- SCRIBE_START -->"
SCRIBE_END = "<!-- SCRIBE_END -->"


def parse_post(md_path: Path) -> dict:
    """Parse a markdown file with YAML front matter. Returns a post dict."""
    text = md_path.read_text(encoding="utf-8")

    # Split front matter from body
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            front = yaml.safe_load(parts[1])
            body_md = parts[2].strip()
        else:
            front = {}
            body_md = text
    else:
        front = {}
        body_md = text

    slug = md_path.stem
    content_html = markdown.markdown(body_md, extensions=["fenced_code", "tables"])

    # Normalize date to a date object
    date = front.get("date")
    if isinstance(date, str):
        date = datetime.date.fromisoformat(date)
    elif isinstance(date, datetime.datetime):
        date = date.date()

    return {
        "slug": slug,
        "title": front.get("title", slug),
        "date": date,
        "hero": front.get("hero"),
        "summary": front.get("summary", ""),
        "featured": front.get("featured", False),
        "repo": front.get("repo"),
        "content": content_html,
    }


def render_post_page(post: dict, env: Environment) -> str:
    """Render the full HTML for a post page."""
    template = env.get_template("post.html")
    return template.render(post=post)


def build_scribe_section(posts: list) -> str:
    """Build the HTML block that goes between SCRIBE_START and SCRIBE_END."""
    if not posts:
        return ""

    # Most-recent featured post becomes the hero; the rest become cards
    featured = [p for p in posts if p["featured"]]
    hero = featured[0] if featured else posts[0]
    cards = [p for p in posts if p is not hero]

    lines = ['        <section class="scribe-section">']
    lines.append('            <h2 class="section-label">Electronics</h2>')

    # Hero block
    hero_url = f"posts/{hero['slug']}/"
    lines.append(f'            <a class="post-hero" href="{hero_url}">')
    if hero["hero"]:
        lines.append(f'                <img class="post-hero-img" src="{hero["hero"]}" alt="{hero["title"]}">')
    lines.append('                <div class="post-hero-body">')
    lines.append(f'                    <h3>{hero["title"]}</h3>')
    if hero["date"]:
        lines.append(f'                    <p class="post-date">{hero["date"].strftime("%B %-d, %Y")}</p>')
    if hero["summary"]:
        lines.append(f'                    <p>{hero["summary"]}</p>')
    lines.append('                    <span class="read-more">Read more →</span>')
    lines.append('                </div>')
    lines.append('            </a>')

    # Card list
    if cards:
        lines.append('            <div class="post-cards">')
        for card in cards:
            card_url = f"posts/{card['slug']}/"
            lines.append(f'                <a class="post-card" href="{card_url}">')
            lines.append(f'                    <h4>{card["title"]}</h4>')
            if card["date"]:
                lines.append(f'                    <p class="post-date">{card["date"].strftime("%B %-d, %Y")}</p>')
            if card["summary"]:
                lines.append(f'                    <p>{card["summary"]}</p>')
            lines.append('                </a>')
        lines.append('            </div>')

    lines.append('        </section>')
    return "\n".join(lines)


def inject_into_index(section_html: str) -> None:
    """Replace content between SCRIBE_START and SCRIBE_END in index.html."""
    text = INDEX_HTML.read_text(encoding="utf-8")

    if SCRIBE_START not in text or SCRIBE_END not in text:
        raise ValueError(
            f"Injection markers not found in {INDEX_HTML}.\n"
            f"Add '{SCRIBE_START}' and '{SCRIBE_END}' to index.html first."
        )

    pattern = re.compile(
        re.escape(SCRIBE_START) + r".*?" + re.escape(SCRIBE_END),
        re.DOTALL,
    )
    replacement = f"{SCRIBE_START}\n{section_html}\n        {SCRIBE_END}"
    new_text = pattern.sub(replacement, text)
    INDEX_HTML.write_text(new_text, encoding="utf-8")


def main():
    env = Environment(loader=FileSystemLoader(str(TEMPLATES_DIR)))

    # Collect and parse all posts
    md_files = sorted(POSTS_DIR.glob("*.md"))
    if not md_files:
        print("No posts found in posts/")
        return

    posts = []
    for md_path in md_files:
        post = parse_post(md_path)
        posts.append(post)
        print(f"  Parsed: {md_path.name} → {post['title']}")

    # Sort newest first
    posts.sort(key=lambda p: p["date"] or datetime.date.min, reverse=True)

    # Render individual post pages
    for post in posts:
        out_dir = POSTS_DIR / post["slug"]
        out_dir.mkdir(exist_ok=True)
        html = render_post_page(post, env)
        out_path = out_dir / "index.html"
        out_path.write_text(html, encoding="utf-8")
        print(f"  Wrote: {out_path.relative_to(SITE_ROOT)}")

    # Build and inject index section
    section_html = build_scribe_section(posts)
    inject_into_index(section_html)
    print(f"  Updated: index.html")

    print(f"\nDone. {len(posts)} post(s) processed.")


if __name__ == "__main__":
    main()
