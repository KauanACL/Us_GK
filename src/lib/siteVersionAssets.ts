import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import {
  sortedSiteVersionConfigs,
  type SiteVersion,
  type SiteVersionConfig,
  type SiteVersionSummary,
  type TimelinePhoto,
} from "@/data/siteVersions";

const PHOTO_FILE_PATTERN = /^foto(\d+)\.(jpe?g|png|webp)$/i;
const PUBLIC_DIR = path.join(process.cwd(), "public");
const VERSION_ASSET_BASE = "/versions";

type VersionPhoto = {
  number: number;
  src: string;
};

export function getVersionSummaries(): SiteVersionSummary[] {
  return sortedSiteVersionConfigs.map((version) => ({
    date: version.date,
    label: version.label,
    route: getVersionRoute(version.date),
  }));
}

export function getVersionDates(): string[] {
  return sortedSiteVersionConfigs.map((version) => version.date);
}

export function getLatestSiteVersion(): SiteVersion {
  return buildSiteVersion(sortedSiteVersionConfigs[0]);
}

export function getSiteVersionByDate(date: string): SiteVersion | undefined {
  const config = sortedSiteVersionConfigs.find((version) => version.date === date);
  return config ? buildSiteVersion(config) : undefined;
}

function buildSiteVersion(config: SiteVersionConfig): SiteVersion {
  const photos = getVersionPhotos(config.assetDir);
  const images = photos.map((photo) => photo.src);
  const fallbackImage = images[0] ?? "";
  const heroImage =
    photos.find((photo) => photo.number === config.heroPhotoNumber)?.src ??
    fallbackImage;
  const timeline = config.timelineCaptions
    ? buildTimeline(photos, config.timelineCaptions)
    : undefined;

  return {
    ...config,
    route: getVersionRoute(config.date),
    musicSrc: `${VERSION_ASSET_BASE}/${config.assetDir}/music.mp3`,
    heroImage,
    images,
    timeline,
  };
}

function getVersionPhotos(assetDir: string): VersionPhoto[] {
  const dirPath = path.join(PUBLIC_DIR, "versions", assetDir);
  if (!existsSync(dirPath)) return [];

  return readdirSync(dirPath)
    .flatMap((fileName) => {
      const match = fileName.match(PHOTO_FILE_PATTERN);
      if (!match) return [];

      return [
        {
          number: Number(match[1]),
          src: `${VERSION_ASSET_BASE}/${assetDir}/${fileName}`,
        },
      ];
    })
    .sort((a, b) => a.number - b.number);
}

function buildTimeline(
  photos: VersionPhoto[],
  captions: NonNullable<SiteVersionConfig["timelineCaptions"]>,
): TimelinePhoto[] {
  return photos.map((photo) => {
    const caption = captions[photo.number];
    return {
      src: photo.src,
      title: caption?.title ?? `Foto ${photo.number}`,
      caption: caption?.caption ?? "Adicione uma legenda para esta foto.",
    };
  });
}

function getVersionRoute(date: string) {
  return `/${date}`;
}
