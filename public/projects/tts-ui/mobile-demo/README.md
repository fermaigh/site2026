# Demo 3 mobile screen art

Every slot below renders a tinted placeholder until the matching PNG lands
here — `TtsShot` layers the file over the placeholder as a background image, so
dropping in an export needs no code change.

Export from Figma `Portifolio-Site` (file `oytNfnJhXHIPt6irQh5l9L`):

| File | Source node | Size |
| --- | --- | --- |
| `invitation-hero.png` | `1668:51469` (Zaraimage) | 390×390 |

## Delivered 2x artwork

These ship as real exports at 2x and are wired at their 1x box, with a
transparent placeholder behind so their alpha stays clean:

| File | Native | Rendered at | Used by |
| --- | --- | --- | --- |
| `brand-connect-hero.png` | 364×336 | 182×168 | header collage |
| `commission.png` | 88×88 | 44×44 | Commission boost |
| `brands.png` | 88×88 | 44×44 | Top performed brands |
| `traffic.png` | 88×88 | 44×44 | Traffic support |
| `goal.png` | 188×188 | 94×94 | goal badge |

`brand-connect-hero.svg` stays as a fallback layer only; the PNG wins whenever
it is present.

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
