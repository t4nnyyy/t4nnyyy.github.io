# t4nnyyy Kali-style GitHub Pages Portfolio

A static GitHub Pages website that opens like a Kali-style boot screen with a Kali-inspired dragon splash, then loads a desktop UI with your wallpaper, file explorer, terminal, social links, and repository shortcuts.

## Files

```text
.
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    └── t4nnyyy.png   <-- add your wallpaper here
```

## Latest updates included

- All repository, GitHub, LinkedIn, and YouTube links now open directly in a new browser tab.
- Removed the internal OS preview/link-choice feature to keep link behavior simple and reliable.
- Removed the macOS-style close/minimize/maximize dots from all website windows.
- Kept the simple `X` button for closing windows.
- Close buttons remain fixed for repository and terminal windows.
- Kali-style boot splash with a Kali-inspired logo/wordmark before the desktop opens.
- GitHub, LinkedIn, and YouTube logos are included in the top panel, dock, and desktop shortcuts.

## How to add your wallpaper

1. Put your wallpaper file inside the `assets` folder.
2. Rename it exactly to:

```text
t4nnyyy.png
```

The CSS already points to:

```css
url("assets/t4nnyyy.png")
```

If the image is missing, the page still loads with a dark fallback background.

## How to host on GitHub Pages

### Option 1: User site

Use this if you want the site at:

```text
https://t4nnyyy.github.io/
```

1. Create a repository named exactly:

```text
t4nnyyy.github.io
```

2. Upload all files from this folder into that repository.
3. Go to **Repository Settings → Pages**.
4. Under **Build and deployment**, select:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Save and wait for GitHub Pages to publish.

### Option 2: Project site

Use this if you want the site inside an existing repo, for example:

```text
https://t4nnyyy.github.io/portfolio/
```

1. Upload these files into your chosen repo.
2. Go to **Repository Settings → Pages**.
3. Select the `main` branch and `/root` folder.
4. Save.

## Customize repositories

Edit `script.js` and update the `repositories` array:

```js
const repositories = [
  {
    name: "PersistHawk",
    url: "https://github.com/t4nnyyy/PersistHawk",
    description: "Persistence hunting workspace..."
  }
];
```

## Customize boot text

Edit the `bootLines` array in `script.js`.

## Customize social links

Update links in `index.html` and terminal commands in `script.js`.

## Terminal commands

Inside the web terminal, try:

```text
help
whoami
repos
social
open github
open linkedin
open youtube
clear
```

## Notes

This is pure static HTML, CSS, and JavaScript. No build step, backend, API key, or package installation is required.
