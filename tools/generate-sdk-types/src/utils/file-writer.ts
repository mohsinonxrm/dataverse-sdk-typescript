import { writeFile, mkdir, readdir, rm } from "fs/promises";
import { dirname, resolve, join } from "path";

/**
 * Write a TypeScript file to disk.
 *
 * Creates directories if they don't exist.
 *
 * @param filePath - Absolute or relative file path
 * @param content - File content
 */
export async function writeTypeScriptFile(filePath: string, content: string): Promise<void> {
  const absolutePath = resolve(filePath);
  const dir = dirname(absolutePath);

  // Ensure directory exists
  await mkdir(dir, { recursive: true });

  // Write file
  await writeFile(absolutePath, content, "utf-8");
}

/**
 * Purge (delete) all files in a directory except specified exclusions.
 *
 * @param dirPath - Directory to purge
 * @param exclude - Files to keep (e.g., base classes)
 */
export async function purgeDirectory(dirPath: string, exclude: string[] = []): Promise<void> {
  const absolutePath = resolve(dirPath);

  try {
    const entries = await readdir(absolutePath, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = join(absolutePath, entry.name);

      // Skip excluded files
      if (exclude.includes(entry.name)) {
        continue;
      }

      // Delete files and directories
      await rm(entryPath, { recursive: true, force: true });
    }
  } catch (error) {
    // Directory doesn't exist yet, that's fine
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}

/**
 * Generate index.ts that re-exports all files in a directory.
 *
 * @param files - List of file names (without .ts extension)
 * @returns index.ts content
 */
export function generateIndexFile(files: string[]): string {
  const exports = files
    .sort()
    .map((file) => `export * from './${file}.js';`)
    .join("\n");

  return `// Auto-generated index file\n${exports}\n`;
}
