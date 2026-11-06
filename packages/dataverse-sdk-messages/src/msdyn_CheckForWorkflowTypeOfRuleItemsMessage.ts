import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForWorkflowTypeOfRuleItemsResponse as msdyn_CheckForWorkflowTypeOfRuleItemsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckForWorkflowTypeOfRuleItemsResponse.fromResponse({});
    return msdyn_CheckForWorkflowTypeOfRuleItemsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckForWorkflowTypeOfRuleItems response message
 */
export class msdyn_CheckForWorkflowTypeOfRuleItemsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForWorkflowTypeOfRuleItemsResponseData) {
    super("msdyn_CheckForWorkflowTypeOfRuleItems");
  }

  static fromResponse(data: unknown): msdyn_CheckForWorkflowTypeOfRuleItemsResponse {
    return new msdyn_CheckForWorkflowTypeOfRuleItemsResponse(
      responseObject<msdyn_CheckForWorkflowTypeOfRuleItemsResponseData>(data)
    );
  }
}
