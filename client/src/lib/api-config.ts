
// في الإنتاج والتطوير: API على نفس السيرفر (relative path)
export const API_BASE_URL = '/api';

// دالة توليد رابط الـ API
export function getApiUrl(endpoint: string): string {
  // تأكد أن المسار يبدأ بـ "/"، ثم أضف "/api" إذا لم يكن موجودًا
  let normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // إزالة تكرار "/api" إذا وُجد مرتين
  normalizedEndpoint = normalizedEndpoint.replace(/^\/api\/?/, '');

  return `${API_BASE_URL}/${normalizedEndpoint}`;
}

/*export function getApiUrl(endpoint: string): string {
  // تأكد من أن endpoint لا يحتوي على "/api" مكرر
  let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  cleanEndpoint = cleanEndpoint.replace(/^\/api/, '');

  return `${API_BASE_URL}${cleanEndpoint}`;
}
*/

/*export function getApiUrl(endpoint: string): string {
  let normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (!normalizedEndpoint.startsWith('/api')) {
    normalizedEndpoint = `/api${normalizedEndpoint}`;
  }
  normalizedEndpoint = normalizedEndpoint.replace('/api/api/', '/api/');

  // نزيل الـ "/api" من بداية endpoint لأننا أضفنا في API_BASE_URL
  return API_BASE_URL + normalizedEndpoint.replace('/api', '');
}
*/