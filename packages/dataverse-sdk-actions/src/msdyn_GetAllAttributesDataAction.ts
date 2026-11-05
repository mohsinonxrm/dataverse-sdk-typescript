import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAllAttributesData action
 */
export interface msdyn_GetAllAttributesDataResponse {
  Response: string;
}

/**
 * msdyn_GetAllAttributesData action
 *
 * Unbound action
 */
export class msdyn_GetAllAttributesDataAction implements Executable<msdyn_GetAllAttributesDataResponse> {
  constructor(
    public readonly predictionName: string,
    public readonly predictionType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllAttributesData`;

    const body: Record<string, unknown> = {
      PredictionName: this.predictionName,
      PredictionType: this.predictionType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAllAttributesDataResponse> {
    const data = await response.json();
    return data as msdyn_GetAllAttributesDataResponse;
  }
}
