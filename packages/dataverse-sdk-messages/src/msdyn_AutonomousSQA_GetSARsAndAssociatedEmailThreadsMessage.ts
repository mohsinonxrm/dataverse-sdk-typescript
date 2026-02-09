import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads request message
 *
 * Web API Action: msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads
 */
export class msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse>
{
  constructor(
    public msdyn_SalesMacroAgentType: number,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads`;

    const body: Record<string, unknown> = {
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse> {
    const data = await response.json();
    return msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
    };
  }
}

/**
 * msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads response message
 */
export class msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse extends OrganizationResponse {
  constructor(public result: msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse) {
    super("msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads");
  }

  static fromResponse(data: unknown): msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse {
    return new msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse((data as any).value);
  }
}
