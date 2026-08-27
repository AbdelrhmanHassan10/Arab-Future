export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://simsar.acwad.tech/public/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractString(val: any): string {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (typeof val === 'object') {
    if (val.name && typeof val.name !== 'object') return String(val.name);
    if (val.title && typeof val.title !== 'object') return String(val.title);
    if (val.ar && typeof val.ar !== 'object') return String(val.ar);
    if (val.en && typeof val.en !== 'object') return String(val.en);
    if (val.id && typeof val.id !== 'object') return String(val.id);
    if (val.url && typeof val.url !== 'object') return String(val.url);
    if (val.path && typeof val.path !== 'object') return String(val.path);
    if (val.src && typeof val.src !== 'object') return String(val.src);
    return '';
  }
  return String(val);
}

const BASE_URL = API_URL.replace(/\/api$/, "");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getImageUrl(val: any, fallbackIndex: number = 0): string {
  if (!val) {
    return `https://picsum.photos/seed/${fallbackIndex}/800/600`;
  }
  let str = "";
  if (typeof val === 'object') {
    str = String(val.url || val.image_url || val.image_path || val.path || val.src || val.image || val.name || val.file || val.id || "");
  } else {
    str = String(val);
  }
  
  if (!str || str === "[object Object]") return `https://picsum.photos/seed/${fallbackIndex}/800/600`;

  if (str.startsWith('/projects/') || str.startsWith('/images/')) return str;
  if (str.startsWith('http://localhost/') || str.startsWith('http://127.0.0.1/')) {
    str = str.replace(/^http:\/\/(localhost|127\.0\.0\.1)\//, `${BASE_URL}/`);
  }

  if (str.startsWith('http') || str.startsWith('data:')) return str;
  if (str.startsWith('/')) return `${BASE_URL}${str}`;
  return `${BASE_URL}/storage/${str}`;
}
