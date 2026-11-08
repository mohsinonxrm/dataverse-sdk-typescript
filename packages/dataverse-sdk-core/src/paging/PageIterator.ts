import type { DataverseClient } from "../client/DataverseClient.js";
import type { RequestOptions } from "../abstractions/options.js";
import type { PageResponse } from "./types.js";

/**
 * Iterates the records of `first` and of every page after it, following `@odata.nextLink`.
 * `options` are sent with each later page (for example the first request's `Prefer` and
 * impersonation headers, its signal and timeouts), so every page is requested the same way.
 */
export class PageIterator<T> implements AsyncIterable<T> {
  private nextLink?: string;

  constructor(
    private client: DataverseClient,
    private first: PageResponse<T>,
    private options?: RequestOptions
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
      current = await this.client.api(this.nextLink).getPage<T>(this.options);
      this.nextLink = current["@odata.nextLink"];
    }
  }
}
