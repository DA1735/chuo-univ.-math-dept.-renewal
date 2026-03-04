
import { BASE_PATH } from '../constants';

/**
 * Prepends the BASE_PATH to a given path string.
 * Ensures that there are no double slashes and respects the current configuration.
 */
export function withBase(path: string): string {
  // If the path is already an absolute URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:')) {
    return path;
  }

  const base = BASE_PATH.endsWith('/') ? BASE_PATH : `${BASE_PATH}/`;
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  return base + cleanPath;
}
