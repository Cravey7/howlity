'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  {
    title: "Systems",
    href: "/systems",
  },
  {
    title: "Applications",
    href: "/applications",
  },
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Stacks",
    href: "/stacks",
  },
  {
    title: "Tools",
    href: "/tools",
  },
  {
    title: "Environment Variables",
    href: "/environment-variables",
  },
  {
    title: "AI Management",
    items: [
      { title: "Prompts", href: "/ai/prompts" },
      { title: "Instructions", href: "/ai/instructions" },
      { title: "Usage Cost", href: "/ai/usage-cost" },
      { title: "Models", href: "/ai/models" },
      { title: "Agents", href: "/ai/agents" },
    ],
  },
  {
    title: "Pages & Components",
    items: [
      { title: "Pages", href: "/pages" },
      { title: "Components", href: "/components" },
      { title: "Navigation", href: "/navigation" },
    ],
  },
  {
    title: "Database",
    items: [
      { title: "Tables", href: "/database/tables" },
      { title: "Fields", href: "/database/fields" },
      { title: "Relationships", href: "/database/relationships" },
      { title: "Roles", href: "/database/roles" },
      { title: "Permissions", href: "/database/permissions" },
    ],
  },
  {
    title: "Testing",
    items: [
      { title: "Unit Tests", href: "/testing/unit" },
      { title: "API Tests", href: "/testing/api" },
      { title: "E2E Tests", href: "/testing/e2e" },
    ],
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-1">
      {navigation.map((item) => (
        <div key={item.title}>
          {item.items ? (
            <div className="space-y-1">
              <h4 className="px-2 py-1 text-sm font-semibold text-muted-foreground">
                {item.title}
              </h4>
              {item.items.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === subItem.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent"
                  )}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "transparent"
              )}
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
} 