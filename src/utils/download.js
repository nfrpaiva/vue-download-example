/**
 * Extrai o nome do arquivo do header Content-Disposition.
 * Suporta `filename*=UTF-8''nome.pdf` e `filename="nome.pdf"`.
 */
export function getHeaderFileName(contentDisposition) {
  if (!contentDisposition) return null;

  const encoded = /filename\*=(?:UTF-8'')?([^;]+)/i.exec(contentDisposition);
  if (encoded) return decodeURIComponent(encoded[1].trim());

  const plain = /filename="?([^";]+)"?/i.exec(contentDisposition);
  return plain ? plain[1].trim() : null;
}

/** Último segmento do path da URL, usado na ausência do header. */
export function getFileNameFromUrl(url) {
  return new URL(url, window.location.href).pathname.split('/').pop();
}

/** Dispara o download de um Blob no navegador. */
export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  // Necessário para funcionar no Firefox
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
