import type { ImageMetadata } from "astro";
import chatgpt from "../assets/blog/chatgpt.jpeg";
import githubPages from "../assets/blog/github-pages.jpeg";
import gitlogs from "../assets/blog/gitlogs.jpg";
import golang from "../assets/blog/golang.jpg";
import hashMap from "../assets/blog/hash-map.jpeg";
import insertionSort from "../assets/blog/insertion-sort.png";
import instagram from "../assets/blog/instagram.jpeg";

const covers: Record<string, ImageMetadata> = {
  "https://www.diegohdev.com/gitlogs.jpg": gitlogs,
  "https://www.diegohdev.com/golang.png": golang,
  "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/wX2L8L-fGeA/upload/855406e38d6c04acbc88ffb32eda12de.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp":
    githubPages,
  "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/p6ac4ss5vVM/upload/935352980792dfadaab55f17e6cc8d11.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp":
    hashMap,
  "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/95YRwf6CNw8/upload/1f679a5cce18eb8af26bb6993ace837b.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp":
    chatgpt,
  "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/WUmb_eBrpjs/upload/d8ffd839cfca7e18bcccd8eceedbc66d.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp":
    instagram,
  "https://www.diegohdev.com/insertion-sort.png": insertionSort,
};

export function coverFor(src?: string): ImageMetadata | undefined {
  if (!src) return undefined;
  return covers[src];
}
