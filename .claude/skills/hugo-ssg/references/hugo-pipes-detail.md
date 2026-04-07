# Hugo Pipes — Asset Pipeline Detail

Für spezifische Funktions-Signaturen: context7 mit `/gohugoio/hugodocs` verwenden.

## Überblick

Assets in `assets/` (nicht `static/`!) werden über Hugo Pipes verarbeitet.

## SCSS/Sass

```go-html-template
{{ $opts := dict "transpiler" "dartsass" "targetPath" "css/style.css" }}
{{ with resources.Get "sass/main.scss" | css.Sass $opts }}
  <link rel="stylesheet" href="{{ .RelPermalink }}">
{{ end }}
```

Optionen: transpiler (dartsass|libsass), targetPath, outputStyle, includePaths, enableSourceMap

## PostCSS

```go-html-template
{{ $opts := dict "config" "postcss.config.js" "noMap" true }}
{{ with resources.Get "css/main.css" | postCSS $opts }}
  <link rel="stylesheet" href="{{ .RelPermalink }}">
{{ end }}
```

Benötigt: `postcss-cli` und Plugins als Node-Dependencies.

## JavaScript Build (ESBuild)

```go-html-template
{{ $opts := dict
  "targetPath" "js/main.js"
  "minify" (not hugo.IsDevelopment)
  "sourceMap" (cond hugo.IsDevelopment "external" "")
  "target" "es2020"
  "format" "esm"
  "inject" (slice "js/shims.js")
  "defines" (dict "process.env.NODE_ENV" (printf "%q" hugo.Environment))
}}
{{ with resources.Get "js/main.js" | js.Build $opts }}
  <script src="{{ .RelPermalink }}" type="module"></script>
{{ end }}
```

Optionen: target, format (esm|cjs|iife), minify, sourceMap, inject, defines, externals, loader

## Fingerprinting und SRI

```go-html-template
{{ with resources.Get "css/style.css" | resources.Fingerprint "sha384" }}
  <link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous">
{{ end }}
```

Algorithmen: sha256 (default), sha384, sha512, md5

## Minification

```go-html-template
{{ with resources.Get "css/style.css" | resources.Minify }}
  <link rel="stylesheet" href="{{ .RelPermalink }}">
{{ end }}
```

Funktioniert für CSS, JS, JSON, HTML, SVG, XML.

## Verkettung (Bundling)

```go-html-template
{{ $a := resources.Get "js/a.js" }}
{{ $b := resources.Get "js/b.js" }}
{{ $bundle := slice $a $b | resources.Concat "js/bundle.js" | resources.Minify }}
```

## Resource aus String/Template

```go-html-template
{{ $css := ":root { --accent: #f29718; }" | resources.FromString "css/vars.css" }}
```

## Remote Resources

```go-html-template
{{ $opts := dict "headers" (dict "Authorization" "Bearer xxx") }}
{{ with resources.GetRemote "https://api.example.com/data.json" $opts }}
  {{ with .Err }}
    {{ errorf "%s" . }}
  {{ else }}
    {{ $data := . | transform.Unmarshal }}
  {{ end }}
{{ end }}
```

## Image Processing

```go-html-template
{{ $img := resources.Get "images/hero.jpg" }}
{{ $small := $img.Resize "300x" }}
{{ $thumb := $img.Fill "150x150 Center" }}
{{ $fit := $img.Fit "600x400" }}
{{ $crop := $img.Crop "400x300 TopLeft" }}

{{/* WebP-Konvertierung */}}
{{ $webp := $img.Resize "800x webp" }}

{{/* Responsive Images */}}
{{ $tiny := $img.Resize "500x" }}
{{ $medium := $img.Resize "800x" }}
{{ $large := $img.Resize "1200x" }}
<img srcset="{{ $tiny.RelPermalink }} 500w, {{ $medium.RelPermalink }} 800w, {{ $large.RelPermalink }} 1200w"
     sizes="(max-width: 600px) 500px, (max-width: 900px) 800px, 1200px"
     src="{{ $medium.RelPermalink }}"
     alt="..." loading="lazy">
```

Filter: Brightness, ColorBalance, Contrast, Gamma, GaussianBlur, Grayscale, Hue, Invert, Opacity, Overlay, Pixelate, Saturation, Sepia, Sigmoid, UnsharpMask

## Produktions-Pattern (Best Practice)

```go-html-template
{{ $style := resources.Get "sass/main.scss" | css.Sass }}
{{ if hugo.IsDevelopment }}
  <link rel="stylesheet" href="{{ $style.RelPermalink }}">
{{ else }}
  {{ with $style | resources.Minify | resources.Fingerprint }}
    <link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous">
  {{ end }}
{{ end }}
```
