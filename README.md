# mohiuddinru.github.io

Personal portfolio site for **Mohiuddin** — Software Engineer.
Live at **https://mohiuddinru.github.io**.

## Stack

Plain, dependency-free static site — HTML, CSS, and a little vanilla JavaScript.
No build step. GitHub Pages serves the root `index.html` directly.

```
index.html            # page content
assets/css/style.css  # styles + design tokens
assets/js/main.js     # mobile nav + footer year
.nojekyll             # serve assets/ without Jekyll processing
```

## Editing

All content lives in `index.html`. Search for the `Editable placeholder` notes
and the `#` (hash) links to fill in:

- **About** — bio paragraph and the "At a glance" facts.
- **Projects** — replace the three placeholder cards with real projects (name,
  description, tech tags, and `Live` / `Code` links).
- **Contact** — set the LinkedIn URL (currently `#`).

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```
