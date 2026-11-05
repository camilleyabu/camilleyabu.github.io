# Camille Yabu · Portfolio

Plain HTML, CSS, and JS. No build step.

## Put it on GitHub Pages

1. Create a new repo on GitHub named exactly `camilleyabu.github.io` (public).
2. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder (drag them into the repo page, or use git).
3. Go to **Settings > Pages**, set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. In a minute or two your site is live at `https://camilleyabu.github.io`.

## Fill in your stuff

Search `index.html` for `YOUR-` and `TODO` and replace:

| Placeholder | What to put |
|---|---|
| `camilleyabu` | GitHub username (header + stock project link) |
| `YOUR-HANDLE` | LinkedIn, YouTube, Instagram, SoundCloud handles |
| `VIDEO_ID` | The part after `v=` in a YouTube link |
| `assets/Camille_Yabu_Resume.pdf` | Drop your resume PDF into `assets/` with this name |
| Instagram tiles | Add photos to `assets/` and swap each `<div class="ig g1"></div>` for `<img class="ig" src="assets/photo1.jpg" alt="">` |
| Music | Replace the waveform card with a Spotify or SoundCloud embed (example is in the TODO comment) |

## Change the colors

All colors live at the top of `style.css` under `:root`. Change `--pink`, `--lime`, `--blue`, etc. and the whole site follows.
