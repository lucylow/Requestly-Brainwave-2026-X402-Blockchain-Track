import { ExternalLink, CheckCircle, Search } from 'lucide-react';

interface Result {
  title: string;
  url: string;
  snippet: string;
  source: string;
}

export function ResultsDisplay({ results, query }: { results: Result[]; query: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Search className="h-4 w-4" />
        <span>Search results for: <span className="text-foreground font-medium">"{query}"</span></span>
        <span className="flex items-center gap-1 text-xs text-green-400 ml-auto">
          <CheckCircle className="h-3 w-3" />
          <span>Settled</span>
        </span>
      </div>

      <div className="space-y-4">
        {results.map((result, idx) => (
          <div key={idx} className="group rounded-lg border border-border bg-background/50 p-4 hover:border-cyan-500/30 transition-colors">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block space-y-1"
            >
              <div className="flex items-center gap-2">
                <h4 className="text-base font-medium text-cyan-400 group-hover:underline">
                  {result.title}
                </h4>
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{result.snippet}</p>
              <p className="text-xs text-muted-foreground">{result.source}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
