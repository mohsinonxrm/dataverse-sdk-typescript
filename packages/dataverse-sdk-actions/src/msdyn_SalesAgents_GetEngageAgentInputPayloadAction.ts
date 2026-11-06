import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_GetEngageAgentInputPayload action
 */
export interface msdyn_SalesAgents_GetEngageAgentInputPayloadResponse {
  msdyn_Thread: string;
  msdyn_EngageAgentInput: string;
}

/**
 * msdyn_SalesAgents_GetEngageAgentInputPayload action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetEngageAgentInputPayloadAction implements Executable<msdyn_SalesAgents_GetEngageAgentInputPayloadResponse> {
  constructor(
    public readonly msdyn_Thread: string | undefined,
    public readonly msdyn_SalesAgentRun: string | undefined,
    public readonly msdyn_SalesMacroAgentType: number,
    public readonly msdyn_TrackingId?: string
  ) {}

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
    return data as msdyn_SalesAgents_GetEngageAgentInputPayloadResponse;
  }
}
