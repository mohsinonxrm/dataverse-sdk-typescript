import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { list } from "./types/index.js";

/**
 * Response from the CopyDynamicListToStatic action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CopyDynamicListToStaticResponse =
  (list & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as CopyDynamicListToStaticResponse;
  }
}
