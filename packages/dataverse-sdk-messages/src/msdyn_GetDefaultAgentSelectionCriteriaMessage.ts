import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetDefaultAgentSelectionCriteria request message
 *
 * Web API Action: msdyn_GetDefaultAgentSelectionCriteria
 */
export class msdyn_GetDefaultAgentSelectionCriteriaRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetDefaultAgentSelectionCriteriaResponse>
{
  constructor() {
    super("msdyn_GetDefaultAgentSelectionCriteria");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDefaultAgentSelectionCriteria`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetDefaultAgentSelectionCriteriaResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetDefaultAgentSelectionCriteriaResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetDefaultAgentSelectionCriteria action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetDefaultAgentSelectionCriteriaResult {
  "@odata.context"?: string;
  SelectionCriteria: string;
  Success: boolean;
}

/**
 * msdyn_GetDefaultAgentSelectionCriteria response message
 *
 * `result` is the value the msdyn_GetDefaultAgentSelectionCriteria action returns (see {@link msdyn_GetDefaultAgentSelectionCriteriaResult}).
 */
export class msdyn_GetDefaultAgentSelectionCriteriaResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetDefaultAgentSelectionCriteriaResult) {
    super("msdyn_GetDefaultAgentSelectionCriteria");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetDefaultAgentSelectionCriteriaResponse {
    return new msdyn_GetDefaultAgentSelectionCriteriaResponse(
      data as msdyn_GetDefaultAgentSelectionCriteriaResult
    );
  }
}
