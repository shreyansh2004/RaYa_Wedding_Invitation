import process from "node:process";

/** @type {import('next').NextConfig} */
const [owner, repository] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isUserOrOrganizationSite =
  owner !== undefined &&
  repository?.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const basePath =
  process.env.GITHUB_ACTIONS === "true" &&
  repository &&
  !isUserOrOrganizationSite
    ? `/${repository}`
    : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;