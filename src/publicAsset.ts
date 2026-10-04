/** Resolve public files on both origin-root hosting and GitHub Pages. */
export function publicAsset(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const base = import.meta.env.BASE_URL;
  return `${base.endsWith("/") ? base : `${base}/`}${path.slice(1)}`;
}
