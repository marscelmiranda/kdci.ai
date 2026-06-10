import { useState, useEffect } from 'react';

export type AvatarMap = Map<string, string>;

let cache: AvatarMap | null = null;
let pending: Promise<AvatarMap> | null = null;

const fetchAvatars = (): Promise<AvatarMap> => {
  if (cache) return Promise.resolve(cache);
  if (pending) return pending;
  pending = fetch('/api/authors')
    .then(r => r.ok ? r.json() : [])
    .then((authors: { name: string; avatar_url: string }[]) => {
      const m: AvatarMap = new Map();
      for (const a of authors) {
        if (a.name && a.avatar_url) {
          m.set(a.name.trim().toLowerCase(), a.avatar_url);
        }
      }
      cache = m;
      return m;
    })
    .catch(() => {
      const empty: AvatarMap = new Map();
      cache = empty;
      return empty;
    });
  return pending;
};

export const useAuthorAvatars = (): AvatarMap => {
  const [map, setMap] = useState<AvatarMap>(cache ?? new Map());

  useEffect(() => {
    if (cache) { setMap(cache); return; }
    fetchAvatars().then(setMap);
  }, []);

  return map;
};

export const getAvatarUrl = (map: AvatarMap, name: string): string | undefined =>
  map.get((name || '').trim().toLowerCase());
