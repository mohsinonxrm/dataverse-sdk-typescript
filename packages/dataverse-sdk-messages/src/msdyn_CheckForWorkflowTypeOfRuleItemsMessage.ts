import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckForWorkflowTypeOfRuleItems request message
 *
 * Web API Action: msdyn_CheckForWorkflowTypeOfRuleItems
 */
export class msdyn_CheckForWorkflowTypeOfRuleItemsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForWorkflowTypeOfRuleItemsResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckForWorkflowTypeOfRuleItems");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForWorkflowTypeOfRuleItems`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForWorkflowTypeOfRuleItemsResponse> {
    const data = await response.json();
    return msdyn_CheckForWorkflowTypeOfRuleItemsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionId: this.solutionId,
    };
  }
}

/**
 * msdyn_CheckForWorkflowTypeOfRuleItems response message
 */
export class msdyn_CheckForWorkflowTypeOfRuleItemsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForWorkflowTypeOfRuleItemsResponse) {
    super("msdyn_CheckForWorkflowTypeOfRuleItems");
  }

  static fromResponse(data: unknown): msdyn_CheckForWorkflowTypeOfRuleItemsResponse {
    return new msdyn_CheckForWorkflowTypeOfRuleItemsResponse((data as any).value);
  }
}
