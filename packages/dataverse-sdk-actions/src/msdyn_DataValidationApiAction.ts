import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DataValidationApi action
 */
export interface msdyn_DataValidationApiResponse {
  Result: string;
}

/**
 * msdyn_DataValidationApi action
 *
 * Unbound action
 */
export class msdyn_DataValidationApiAction implements Executable<msdyn_DataValidationApiResponse> {
  constructor(
    public readonly apiType: number,
    public readonly apiPayLoad?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DataValidationApi`;

    const body: Record<string, unknown> = {
      ApiType: this.apiType,
      ApiPayLoad: this.apiPayLoad,
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

  async parseResponse(response: Response): Promise<msdyn_DataValidationApiResponse> {
    const data = await response.json();
    return data as msdyn_DataValidationApiResponse;
  }
}
