import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="text-sm font-bold">Requestly</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
              <Twitter className="h-4 w-4" /> Twitter
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
              <Mail className="h-4 w-4" /> Contact
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            Built for <span className="text-cyan-400">Brainwave 2026</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
