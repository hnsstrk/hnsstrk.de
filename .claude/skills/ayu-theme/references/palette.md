# Offizielle Ayu-Farbpalette

Source: https://github.com/ayu-theme/ayu-colors (`themes/*.yaml`)

## Palette (Grundfarben)

| Color | Light | Mirage | Dark |
|-------|-------|--------|------|
| gray | `#ADAEB1` | `#6E7C8F` | `#5A6673` |
| red | `#F07171` | `#F28779` | `#F07178` |
| pink | `#F2A191` | `#F29E74` | `#F29668` |
| orange | `#FA8532` | `#FFA659` | `#FF8F40` |
| peach | `#E59645` | `#D9BE98` | `#E6C08A` |
| yellow | `#EBA400` | `#FFCD66` | `#FFB454` |
| green | `#86B300` | `#D5FF80` | `#AAD94C` |
| teal | `#4CBF99` | `#95E6CB` | `#95E6CB` |
| indigo | `#55B4D4` | `#5CCFE6` | `#39BAE6` |
| blue | `#22A4E6` | `#73D0FF` | `#59C2FF` |
| purple | `#A37ACC` | `#DFBFFF` | `#D2A6FF` |

## Syntax-Farben (Palette → Syntax-Rolle)

Werte aus dem NPM-Paket `ayu` (nach Alpha-Blending gegen Theme-Hintergrund — maßgeblich).

| Rolle | Palette-Farbe | Light | Mirage | Dark |
|-------|--------------|-------|--------|------|
| tag | indigo | `#55B4D4` | `#5CCFE6` | `#39BAE6` |
| func | yellow | `#F2A300` | `#FFD173` | `#FFB454` |
| entity | blue | `#399EE6` | `#73D0FF` | `#59C2FF` |
| string | green | `#86B300` | `#D5FF80` | `#AAD94C` |
| regexp | teal | `#4CBF99` | `#95E6CB` | `#95E6CB` |
| markup | red | `#F07171` | `#F28779` | `#F07178` |
| keyword | orange | `#FF7E33` | `#FFAD66` | `#FF8F40` |
| special | peach | `#D9B077` | `#FFDFB3` | `#E6C08A` |
| comment | gray | `#ADAFB2` | `#6E7C8E` | `#5B6876` |
| constant | purple | `#A37ACC` | `#DFBFFF` | `#D2A6FF` |
| operator | pink | `#ED9366` | `#F29E74` | `#F29668` |

## Surface-Farben

| Surface | Beschreibung | Light | Mirage | Dark |
|---------|-------------|-------|--------|------|
| sunk | Eingesunkene Flächen | `#EBEEF0` | `#181C26` | `#0A0E16` |
| base | Standard-Hintergrund | `#F8F9FA` | `#1F2430` | `#0D1017` |
| lift | Editor-Hintergrund (primär) | `#FCFCFC` | `#242936` | `#10141C` |
| over | Overlay/Popup | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |

## UI-Farben

| Element | Light | Mirage | Dark |
|---------|-------|--------|------|
| editor.fg | `#5C6166` | `#CCCAC2` | `#BFBDB6` |
| ui.fg | `#828E9F` | `#707A8C` | `#555E73` |
| ui.line | `#E8E8E8` | `#171B24` | `#1B1F29` |
| ui.panel.bg | — | `#282E3B` | `#141821` |
| ui.popup.bg | — | `#1C212C` | `#0F131A` |
| accent | `#F29718` | `#FFCC66` | `#E6B450` |

## VCS-Farben

| Status | Light | Mirage | Dark |
|--------|-------|--------|------|
| added | `#6CBF43` | `#87D96C` | `#70BF56` |
| modified | `#478ACC` | `#80BFFF` | `#73B8FF` |
| removed | `#FF7383` | `#F27983` | `#F26D78` |

## Terminal-Farben

| Color | Light | Mirage | Dark |
|-------|-------|--------|------|
| black | gray.l1 | `#0A0000` | `#0A0000` |
| red | markup | markup | markup |
| green | string | string | string |
| yellow | func | func | func |
| blue | entity | entity | entity |
| magenta | constant | constant | constant |
| cyan | regexp | regexp | regexp |
| white | gray.l4 | gray.l4 | `#FFFFFF` |

## Designprinzipien

- **Drei Varianten** für ganztägiges Arbeiten: Light (Tag), Mirage (Übergang), Dark (Nacht)
- **Konsistente Syntax-Farben** über alle drei Themes — gleiche Rollen, angepasste Helligkeit
- **Surface-Hierarchie**: sunk < base < lift < over (von dunkelster zu hellster Fläche)
- **Palette-Range**: Jede Palette-Farbe hat 5 Helligkeitsstufen (l1–l5), Syntax-Rollen nutzen spezifische Stufen
