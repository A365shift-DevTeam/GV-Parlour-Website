// Paths to the downsized variants written by scripts/make-image-variants.mjs.
// A width only exists here if that script lists it for the source file.

/** '/assets/founder.webp', 160 -> '/assets/sized/founder-160.webp' */
export function sizedSrc(src, width) {
  const name = src.slice(src.lastIndexOf('/') + 1).replace(/\.[^.]+$/, '');
  return `/assets/sized/${name}-${width}.webp`;
}

/** srcSet string for the given variant widths. */
export function sizedSrcSet(src, widths) {
  return widths.map((w) => `${sizedSrc(src, w)} ${w}w`).join(', ');
}
