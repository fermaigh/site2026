# Demo 3 mobile screen art

Every slot below renders a tinted placeholder until the matching PNG lands
here — `TtsShot` layers the file over the placeholder as a background image, so
dropping in an export needs no code change.

Export from Figma `Portifolio-Site` (file `oytNfnJhXHIPt6irQh5l9L`):

| File | Source node | Size |
| --- | --- | --- |
| `invitation-hero.png` | `1668:51469` (Zaraimage) | 390×390 |
| `brand-connect-hero.png` | `1668:54175` (Headimage collage) | 201×184, transparent |
| `benefit-1.png` | `1668:54195` | 44×44, transparent |
| `benefit-2.png` | `1668:54201` | 44×44, transparent |
| `benefit-3.png` | `1668:54207` | 44×44, transparent |
| `goal-badge.png` | `1668:54222` (94 asset) | 94×94, transparent |

The 3D renders (`brand-connect-hero`, `benefit-*`, `goal-badge`) need
transparent backgrounds — the hero overlaps the intro copy by design.

## Already provided

The left screen's products and shop avatar ship as vector art in this folder
and need no Figma export:

- `invitation-product-1.svg` — makeup blender sponge (Figma `1664:38133`)
- `invitation-product-2.svg` — velvet matte lipstick (Figma `1664:38134`)
- `invitation-product-3.svg` — gold-lid radiance cream jar (Figma `1664:38135`)
- `invitation-shop.svg` — Dewpoint Beauty Co. mark
- `bc-product-1.svg` … `bc-product-6.svg` — the six Brand Connect grid items
  (ivory tank, emerald slip dress, straight-leg trousers, mesh-strap watch,
  square sunglasses, centella gel), redrawn from the photos in Figma
  `1669:54958` / `54989` / `55020` / `55082` / `55151` / `55183`

The three product slots redraw the photos at those Figma nodes, because this
environment cannot reach figma.com to download the originals. Dropping the real
exports in at the same filenames replaces them.

Swap any of them for a real product photo by dropping a file with the same
name at the same path; `TtsShot` takes whatever is there.
