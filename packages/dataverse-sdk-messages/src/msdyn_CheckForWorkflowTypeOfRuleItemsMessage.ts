import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckForWorkflowTypeOfRuleItems message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForWorkflowTypeOfRuleItemsRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckForWorkflowTypeOfRuleItems request message
 *
 * Web API Action: msdyn_CheckForWorkflowTypeOfRuleItems
 */
export class msdyn_CheckForWorkflowTypeOfRuleItemsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForWorkflowTypeOfRuleItemsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForWorkflowTypeOfRuleItemsRequestParameters>;

  constructor(parameters: msdyn_CheckForWorkflowTypeOfRuleItemsRequestParameters = {}) {
    super("msdyn_CheckForWorkflowTypeOfRuleItems", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForWorkflowTypeOfRuleItems`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForWorkflowTypeOfRuleItemsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckForWorkflowTypeOfRuleItemsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckForWorkflowTypeOfRuleItems action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForWorkflowTypeOfRuleItemsResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForWorkflowTypeOfRuleItems response message
 *
 * `result` is the value the msdyn_CheckForWorkflowTypeOfRuleItems action returns (see {@link msdyn_CheckForWorkflowTypeOfRuleItemsResult}).
 */
export class msdyn_CheckForWorkflowTypeOfRuleItemsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForWorkflowTypeOfRuleItemsResult) {
    super("msdyn_CheckForWorkflowTypeOfRuleItems");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckForWorkflowTypeOfRuleItemsResponse {
    return new msdyn_CheckForWorkflowTypeOfRuleItemsResponse(
      data as msdyn_CheckForWorkflowTypeOfRuleItemsResult
    );
  }
}
