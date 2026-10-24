export type DemoMedia =
  | { type: "file"; src: string }
  | { type: "youtube"; src: string }
  | { type: "loom"; src: string };

const youtubeId =
  /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/;
const loomId = /loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/;

export function demoMedia(src?: string): DemoMedia | undefined {
  const value = src?.trim();
  if (!value) return undefined;

  const youtube = value.match(youtubeId);
  if (youtube) {
    return {
      type: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${youtube[1]}`,
    };
  }

  const loom = value.match(loomId);
  if (loom) {
    return { type: "loom", src: `https://www.loom.com/embed/${loom[1]}` };
  }

  if (/^https?:\/\//.test(value) && !/\.(mp4|webm|ogg)(\?.*)?$/i.test(value)) {
    return undefined;
  }

  return { type: "file", src: value };
}
