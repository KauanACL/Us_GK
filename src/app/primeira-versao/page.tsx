import VersionedExperience from "@/components/VersionedExperience";
import { siteVersions } from "@/data/siteVersions";

export default function FirstVersionPage() {
  return (
    <VersionedExperience
      mode="classic"
      version={siteVersions["first-version"]}
    />
  );
}

