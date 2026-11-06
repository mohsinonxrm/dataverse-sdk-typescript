/**
 * Web Storage access that never throws: storage can be blocked (private windows, strict
 * cookie settings, sandboxed frames), and a preference that can't be saved must not break the app.
 */
function read(storage: () => Storage, key: string): string | null {
  try {
    return storage().getItem(key);
  } catch {
    return null;
  }
}

function write(storage: () => Storage, key: string, value: string | null): void {
  try {
    if (value === null) storage().removeItem(key);
    else storage().setItem(key, value);
  } catch {
    // Not saved; the in-memory state still applies for this visit.
  }
}

export const readLocal = (key: string) => read(() => window.localStorage, key);
export const writeLocal = (key: string, value: string | null) =>
  write(() => window.localStorage, key, value);
export const readSession = (key: string) => read(() => window.sessionStorage, key);
export const writeSession = (key: string, value: string | null) =>
  write(() => window.sessionStorage, key, value);
