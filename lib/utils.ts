
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PAGE_SCHEMA_ID = 'active-page-ld';

export function setPageSchema(schema: object | null): void {
  let slot = document.getElementById(PAGE_SCHEMA_ID) as HTMLScriptElement | null;
  if (schema === null) {
    slot?.remove();
    return;
  }
  if (!slot) {
    slot = document.createElement('script');
    slot.id = PAGE_SCHEMA_ID;
    slot.type = 'application/ld+json';
    document.head.appendChild(slot);
  }
  slot.textContent = JSON.stringify(schema);
}

export function calcReadTime(content: string): string {
  try {
    const blocks = JSON.parse(content || '[]');
    const text = blocks
      .map((b: any) => {
        switch (b.type) {
          case 'rich_text': return b.content?.text || '';
          case 'pull_quote': return b.content?.quote || '';
          case 'two_columns': return (b.content?.left?.text || '') + ' ' + (b.content?.right?.text || '');
          case 'cta': return b.content?.headline || '';
          default: return '';
        }
      })
      .join(' ')
      .replace(/<[^>]+>/g, '')
      .trim();
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min`;
  } catch {
    return '5 min';
  }
}
