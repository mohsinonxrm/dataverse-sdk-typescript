import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SignalRInstanceActions action
 */
export interface msdyn_SignalRInstanceActionsResponse {
  response: string;
}

/**
 * msdyn_SignalRInstanceActions action
 *
 * Unbound action
 */
export class msdyn_SignalRInstanceActionsAction implements Executable<msdyn_SignalRInstanceActionsResponse> {
  constructor(
    public readonly serviceName: string,
    public readonly webApiName: string,
    public readonly requestJson: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SignalRInstanceActions`;

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

  async parseResponse(response: Response): Promise<msdyn_SignalRInstanceActionsResponse> {
    const data = await response.json();
    return data as msdyn_SignalRInstanceActionsResponse;
  }
}
