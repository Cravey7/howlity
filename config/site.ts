export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "DevFlow",
  description: "Manage your systems, applications, features, and stacks",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Systems",
      href: "/systems",
    },
    {
      title: "Applications",
      href: "/applications",
    },
    {
      title: "Settings",
      href: "/settings",
    },
  ],
  links: {
    github: "https://github.com/yourusername/devflow",
    docs: "/docs",
  },
} 