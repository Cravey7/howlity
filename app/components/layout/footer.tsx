import Link from "next/link"
import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              devflow
            </Link>
            . The source code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              GitHub
            </Link>
            <Link
              href={siteConfig.links.docs}
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Documentation
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
} 