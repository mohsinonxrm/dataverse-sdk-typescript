import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ForecastInstanceActions action
 */
export interface msdyn_ForecastInstanceActionsResponse {
  response: string;
}

/**
 * msdyn_ForecastInstanceActions action
 *
 * Unbound action
 */
export class msdyn_ForecastInstanceActionsAction implements Executable<msdyn_ForecastInstanceActionsResponse> {
  constructor(
    public readonly serviceName: string,
    public readonly webApiName: string,
    public readonly requestJson: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastInstanceActions`;

    const body: Record<string, unknown> = {
      ServiceName: this.serviceName,
      WebApiName: this.webApiName,
      RequestJson: this.requestJson,
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

  async parseResponse(response: Response): Promise<msdyn_ForecastInstanceActionsResponse> {
    const data = await response.json();
    return data as msdyn_ForecastInstanceActionsResponse;
  }
}
