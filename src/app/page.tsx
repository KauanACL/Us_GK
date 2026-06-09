import VersionedExperience from "@/components/VersionedExperience";
import {
  getLatestSiteVersion,
  getVersionSummaries,
} from "@/lib/siteVersionAssets";

export default function Home() {
  const version = getLatestSiteVersion();
  const versions = getVersionSummaries();

  return (
    <VersionedExperience
      version={version}
      versions={versions}
    />
  );
}
