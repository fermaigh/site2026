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
| `bc-product-1.png` … `bc-product-6.png` | `1668:54243`, `54274`, `54305`, `54370`, `54402`, `54434` | 171×173 |

The 3D renders (`brand-connect-hero`, `benefit-*`, `goal-badge`) need
transparent backgrounds — the hero overlaps the intro copy by design.

## Already provided

The left screen's products and shop avatar ship as vector art in this folder
and need no Figma export:

- `invitation-product-1.svg` — hydrating serum dropper bottle
- `invitation-product-2.svg` — ceramide cream jar
- `invitation-product-3.svg` — mineral sunscreen tube
- `invitation-shop.svg` — Dewpoint Skin Co. mark

Swap any of them for a real product photo by dropping a file with the same
name at the same path; `TtsShot` takes whatever is there.
