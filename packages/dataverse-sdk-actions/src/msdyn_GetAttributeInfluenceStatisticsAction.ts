import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAttributeInfluenceStatistics action
 */
export interface msdyn_GetAttributeInfluenceStatisticsResponse {
  Response: string;
}

/**
 * msdyn_GetAttributeInfluenceStatistics action
 *
 * Unbound action
 */
export class msdyn_GetAttributeInfluenceStatisticsAction implements Executable<msdyn_GetAttributeInfluenceStatisticsResponse> {
  constructor(
    public readonly attributeName: string,
    public readonly entityName: string,
    public readonly predictionName: string,
    public readonly predictionType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAttributeInfluenceStatistics`;

    const body: Record<string, unknown> = {
      AttributeName: this.attributeName,
      EntityName: this.entityName,
      PredictionName: this.predictionName,
      PredictionType: this.predictionType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAttributeInfluenceStatisticsResponse> {
    const data = await response.json();
    return data as msdyn_GetAttributeInfluenceStatisticsResponse;
  }
}
