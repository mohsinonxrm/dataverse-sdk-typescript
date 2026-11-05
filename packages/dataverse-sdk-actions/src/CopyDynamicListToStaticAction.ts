import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { list } from "./types/index.js";

/**
 * Response from CopyDynamicListToStatic action
 */
export interface CopyDynamicListToStaticResponse {
  value: list;
}

/**
 * CopyDynamicListToStatic action
 *
 * Bound action
 * Binding parameter: entity (mscrm.list)
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
    const data = await response.json();
    return data as CopyDynamicListToStaticResponse;
  }
}
