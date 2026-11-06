import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_UpdateContactProfilerDetail action
 */
export interface msdyn_SalesAgents_UpdateContactProfilerDetailResponse {
  msdyn_IsSuccess: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_UpdateContactProfilerDetail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_UpdateContactProfilerDetailActionParameters {
  msdyn_Operation: string;
  msdyn_RegardingEntity: string;
  msdyn_RegardingId: string;
  msdyn_ContactProfilerDetailId: string;
}

/**
 * msdyn_SalesAgents_UpdateContactProfilerDetail action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_UpdateContactProfilerDetailAction implements Executable<msdyn_SalesAgents_UpdateContactProfilerDetailResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_UpdateContactProfilerDetailActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_UpdateContactProfilerDetail`;

    const body = requestBody({
      msdyn_Operation: this.parameters.msdyn_Operation,
      msdyn_RegardingEntity: this.parameters.msdyn_RegardingEntity,
      msdyn_RegardingId: this.parameters.msdyn_RegardingId,
      msdyn_ContactProfilerDetailId: this.parameters.msdyn_ContactProfilerDetailId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_UpdateContactProfilerDetailResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_UpdateContactProfilerDetailResponse;
    return (await response.json()) as msdyn_SalesAgents_UpdateContactProfilerDetailResponse;
  }
}
