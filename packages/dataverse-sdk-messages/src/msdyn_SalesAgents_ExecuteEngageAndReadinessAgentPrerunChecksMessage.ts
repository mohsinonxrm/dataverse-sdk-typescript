import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks request message
 *
 * Web API Action: msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks
 */
export class msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse>
{
  constructor(
    public msdyn_TrackingId: string,
    public msdyn_SalesAgentRun: string,
    public msdyn_SalesMacroAgentType: number
  ) {
    super("msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
    };
  }
}

/**
 * msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks response message
 */
export class msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse) {
    super("msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse {
    return new msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse(
      (data as any).value
    );
  }
}
