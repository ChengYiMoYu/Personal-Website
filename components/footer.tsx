import { Github, Mail, Twitter } from "lucide-react"

const links = [
  { label: "GitHub", href: "#", icon: Github },
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold tracking-wider text-foreground">墨</span>
            <p className="mt-2 text-xs tracking-wider text-muted-foreground">
              以墨为介，记录行路所思
            </p>
          </div>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-xs text-muted-foreground">
            {'© 2025. All rights reserved.'}
          </p>
          <p className="text-xs text-muted-foreground tracking-wider">
            {'用心造物，以墨寄情'}
          </p>
        </div>
      </div>
    </footer>
  )
}
