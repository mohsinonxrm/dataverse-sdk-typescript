import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ListConnectionReferencesResponse as ListConnectionReferencesResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return ListConnectionReferencesResponse.fromResponse({});
    return ListConnectionReferencesResponse.fromResponse(await response.json());
  }
}

/**
 * ListConnectionReferences response message
 */
export class ListConnectionReferencesResponse extends OrganizationResponse {
  constructor(public result: ListConnectionReferencesResponseData) {
    super("ListConnectionReferences");
  }

  static fromResponse(data: unknown): ListConnectionReferencesResponse {
    return new ListConnectionReferencesResponse(
      responseObject<ListConnectionReferencesResponseData>(data)
    );
  }
}
