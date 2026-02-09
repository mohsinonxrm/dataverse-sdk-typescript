import type { DataverseClient } from "../client/DataverseClient.js";
import type { PageResponse } from "./types.js";

export class PageIterator<T> implements AsyncIterable<T> {
  private nextLink?: string;

  constructor(
    private client: DataverseClient,
    private first: PageResponse<T>
  ) {
    this.nextLink = first["@odata.nextLink"];
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    let current: PageResponse<T> | undefined = this.first;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (current) {
      for (const item of current.value) {
        yield item;
      }
      if (!this.nextLink) break;
      current = await this.client.api(this.nextLink).getPage<T>();
      this.nextLink = current["@odata.nextLink"];
    }
  }
}
