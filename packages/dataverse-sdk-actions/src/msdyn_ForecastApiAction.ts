import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ForecastApi action
 */
export interface msdyn_ForecastApiResponse {
  response: string;
}

/**
 * msdyn_ForecastApi action
 *
 * Unbound action
 */
export class msdyn_ForecastApiAction implements Executable<msdyn_ForecastApiResponse> {
  constructor(
    public readonly webApiName: string,
    public readonly requestJson: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastApi`;

    const body: Record<string, unknown> = {
      WebApiName: this.webApiName,
      RequestJson: this.requestJson,
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

  async parseResponse(response: Response): Promise<msdyn_ForecastApiResponse> {
    const data = await response.json();
    return data as msdyn_ForecastApiResponse;
  }
}
