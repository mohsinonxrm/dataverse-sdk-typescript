import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { list } from "./types/index.js";

/**
 * Response from CopyDynamicListToStatic action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface CopyDynamicListToStaticResponse extends list {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * CopyDynamicListToStatic action
 *
 * Bound action
 * Binding parameter: entity (mscrm.list)
 *
 * The first argument is the id of the list record to call it on.
 */
export class CopyDynamicListToStaticAction implements Executable<CopyDynamicListToStaticResponse> {
  constructor(public readonly listId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.CopyDynamicListToStatic`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CopyDynamicListToStaticResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CopyDynamicListToStaticResponse;
    return (await response.json()) as CopyDynamicListToStaticResponse;
  }
}
