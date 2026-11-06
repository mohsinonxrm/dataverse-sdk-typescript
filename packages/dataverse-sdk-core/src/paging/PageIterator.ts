import type { DataverseClient } from "../client/DataverseClient.js";
import type { PageResponse } from "./types.js";

/**
 * Iterates the records of `first` and of every page after it, following `@odata.nextLink`.
 * `headers` are sent with each later page (for example the first request's `Prefer` and
 * impersonation headers), so every page is requested the same way.
 */
export class PageIterator<T> implements AsyncIterable<T> {
  private nextLink?: string;

  constructor(
    private client: DataverseClient,
    private first: PageResponse<T>,
    private signal?: AbortSignal,
    private headers?: Record<string, string>
  ) {
    this.nextLink = first["@odata.nextLink"];
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    let current: PageResponse<T> | undefined = this.first;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (current) {
      for (const item of current.value) {
        yield item;
      }
      if (!this.nextLink) break;
      current = await this.client
        .api(this.nextLink)
        .getPage<T>({ signal: this.signal, headers: this.headers });
      this.nextLink = current["@odata.nextLink"];
    }
  }
}
