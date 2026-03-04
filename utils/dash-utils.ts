
/**
 * LaTeX風のダッシュ表記をUnicodeへ変換するユーティリティ
 * --- (em dash) -> —
 * -- (en dash) -> –
 */
export function normalizeDashes(input?: string): string {
  if (!input) return "";
  // 先に --- を処理して、-- の部分一致と競合しないようにする
  return input
    .replace(/---/g, "—") // em dash
    .replace(/--/g, "–"); // en dash
}
