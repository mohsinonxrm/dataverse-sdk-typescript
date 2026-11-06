import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ListConnectionReferences request message
 *
 * Web API Action: ListConnectionReferences
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class ListConnectionReferencesRequest
  extends OrganizationRequest
  implements Executable<ListConnectionReferencesResponse>
{
  constructor(public workflowId: string) {
    super("ListConnectionReferences");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.ListConnectionReferences`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ListConnectionReferencesResponse> {
    // The body is the complex value, with its @odata.context
    return ListConnectionReferencesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ListConnectionReferences action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ListConnectionReferencesResult {
  "@odata.context"?: string;
  connectionReferences: string;
  connections: string;
  mappingBetweenLogicalNameAndName: string;
}

/**
 * ListConnectionReferences response message
 *
 * `result` is the value the ListConnectionReferences action returns (see {@link ListConnectionReferencesResult}).
 */
export class ListConnectionReferencesResponse extends OrganizationResponse {
  constructor(public result: ListConnectionReferencesResult) {
    super("ListConnectionReferences");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ListConnectionReferencesResponse {
    return new ListConnectionReferencesResponse(data as ListConnectionReferencesResult);
  }
}
