function forceDownload(blobUrl: string, filename: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function downloadPhoto(url: string, filename: string) {
  if (!filename) {
    const lastSegment = url.split("\\").pop() || "";
    filename = lastSegment.split("/").pop() || "download";
  }

  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: "cors",
  })
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    })
    .catch((e) => console.error(e));
}