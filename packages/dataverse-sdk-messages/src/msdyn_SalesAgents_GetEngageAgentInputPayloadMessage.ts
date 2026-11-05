import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_GetEngageAgentInputPayload request message
 *
 * Web API Action: msdyn_SalesAgents_GetEngageAgentInputPayload
 */
export class msdyn_SalesAgents_GetEngageAgentInputPayloadRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetEngageAgentInputPayloadResponse>
{
  constructor(
    public msdyn_Thread: string,
    public msdyn_SalesAgentRun: string,
    public msdyn_SalesMacroAgentType: number,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_SalesAgents_GetEngageAgentInputPayload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetEngageAgentInputPayload`;

    const body: Record<string, unknown> = {
      msdyn_Thread: this.msdyn_Thread,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
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
  ): Promise<msdyn_SalesAgents_GetEngageAgentInputPayloadResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_GetEngageAgentInputPayloadResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_Thread: this.msdyn_Thread,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
    };
  }
}

/**
 * msdyn_SalesAgents_GetEngageAgentInputPayload response message
 */
export class msdyn_SalesAgents_GetEngageAgentInputPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetEngageAgentInputPayloadResponse) {
    super("msdyn_SalesAgents_GetEngageAgentInputPayload");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetEngageAgentInputPayloadResponse {
    return new msdyn_SalesAgents_GetEngageAgentInputPayloadResponse((data as any).value);
  }
}
