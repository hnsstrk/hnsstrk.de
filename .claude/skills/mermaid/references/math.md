# Math (KaTeX)

Available since Mermaid v10.9.0.

## Syntax

Surround math expressions with `$$`:

```
graph LR
    A["$$x^2$$"] -->|"$$\sqrt{x+3}$$"| B("$$\frac{1}{2}$$")
```

## Supported Diagrams

Only **Flowcharts** and **Sequence Diagrams**.

## Inline vs Display

Both use `$$` delimiter (no single `$` support in Mermaid):

```
sequenceDiagram
    participant 1 as $$\alpha$$
    participant 2 as $$\beta$$
    1->>2: Solve: $$\sqrt{2+2}$$
    Note right of 2: $$\sqrt{2+2}=\sqrt{4}=2$$
```

## Configuration

### Default (MathML)

No extra config needed — Mermaid uses browser MathML by default.

### Legacy CSS Rendering (KaTeX stylesheet)

For browsers without MathML support:

```yaml
config:
  legacyMathML: true
```

**Requires** KaTeX CSS loaded on the page:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@{version}/dist/katex.min.css">
```

### Force KaTeX Rendering (cross-platform consistency)

```yaml
config:
  forceLegacyMathML: true
```

Always uses KaTeX stylesheet regardless of MathML support. **Recommended** for consistent rendering.

## Common KaTeX Expressions

| Expression | Syntax |
|-----------|--------|
| Fraction | `$$\frac{a}{b}$$` |
| Square root | `$$\sqrt{x}$$` |
| Superscript | `$$x^2$$` |
| Subscript | `$$x_i$$` |
| Sum | `$$\sum_{i=1}^{n} x_i$$` |
| Integral | `$$\int_0^1 f(x)dx$$` |
| Greek | `$$\alpha, \beta, \gamma$$` |
| Matrix | `$$\begin{bmatrix} a & b \\ c & d \end{bmatrix}$$` |
| Cases | `$$x = \begin{cases} a & \text{if } b \\ c & \text{if } d \end{cases}$$` |
| Overbrace | `$$\overbrace{a+b}^{\text{note}}$$` |

## Notes

- Only `$$` delimiter works — single `$` is NOT supported
- KaTeX expressions inside node labels must be quoted: `A["$$formula$$"]`
- Math in edge labels: `A -->|"$$formula$$"| B`
