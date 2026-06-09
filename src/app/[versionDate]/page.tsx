import { notFound } from "next/navigation";
import VersionedExperience from "@/components/VersionedExperience";
import {
  getSiteVersionByDate,
  getVersionDates,
  getVersionSummaries,
} from "@/lib/siteVersionAssets";

export const dynamicParams = false;

export function generateStaticParams() {
  return getVersionDates().map((versionDate) => ({ versionDate }));
}

export default async function VersionDatePage({
  params,
}: {
  params: Promise<{ versionDate: string }>;
}) {
  const { versionDate } = await params;
  const version = getSiteVersionByDate(versionDate);

  if (!version) {
    notFound();
  }

  return (
    <VersionedExperience
      version={version}
      versions={getVersionSummaries()}
    />
  );
}
