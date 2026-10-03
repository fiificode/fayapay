const base = (process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL ?? "").replace(/\/$/, "");

export const downloadUrl = `${base}/download`;
const infoUrl = `${base}/download.json`;

export type ApkInfo = { version: string; size: number; sha256?: string };

let cached: Promise<ApkInfo | null> | null = null;

/** The APK's version, size and checksum. Resolves to null when unavailable. */
export function fetchApkInfo(): Promise<ApkInfo | null> {
  cached ??= fetch(infoUrl)
    .then((r) => (r.ok ? r.json() : null))
    .then((apk) =>
      apk && typeof apk.version === "string" && typeof apk.size === "number"
        ? (apk as ApkInfo)
        : null,
    )
    .catch(() => null);
  return cached;
}
