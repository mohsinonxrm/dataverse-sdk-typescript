import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAttributeInfluenceStatistics action
 */
export interface msdyn_GetAttributeInfluenceStatisticsResponse {
  Response: string;
}

/**
 * Parameters of the msdyn_GetAttributeInfluenceStatistics action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAttributeInfluenceStatisticsActionParameters {
  AttributeName: string;
  EntityName: string;
  PredictionName: string;
  PredictionType: string;
}

/**
 * msdyn_GetAttributeInfluenceStatistics action
 *
 * Unbound action
 */
export class msdyn_GetAttributeInfluenceStatisticsAction implements Executable<msdyn_GetAttributeInfluenceStatisticsResponse> {
  constructor(public readonly parameters: msdyn_GetAttributeInfluenceStatisticsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAttributeInfluenceStatistics`;

    const body = requestBody({
      AttributeName: this.parameters.AttributeName,
      EntityName: this.parameters.EntityName,
      PredictionName: this.parameters.PredictionName,
      PredictionType: this.parameters.PredictionType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAttributeInfluenceStatisticsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetAttributeInfluenceStatisticsResponse;
    return (await response.json()) as msdyn_GetAttributeInfluenceStatisticsResponse;
  }
}
