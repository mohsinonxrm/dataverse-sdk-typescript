import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetWidgetsData action
 */
export interface msdyn_GetWidgetsDataResponse {
  msdyn_response: string;
}

/**
 * msdyn_GetWidgetsData action
 *
 * Unbound action
 */
export class msdyn_GetWidgetsDataAction implements Executable<msdyn_GetWidgetsDataResponse> {
  constructor(
    public readonly msdyn_request: string,
    public readonly msdyn_entityname: string,
    public readonly msdyn_widgettype: string,
    public readonly msdyn_widgetid: string,
    public readonly msdyn_recordid: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetWidgetsData`;

    const body: Record<string, unknown> = {
      msdyn_request: this.msdyn_request,
      msdyn_entityname: this.msdyn_entityname,
      msdyn_widgettype: this.msdyn_widgettype,
      msdyn_widgetid: this.msdyn_widgetid,
      msdyn_recordid: this.msdyn_recordid,
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

  async parseResponse(response: Response): Promise<msdyn_GetWidgetsDataResponse> {
    const data = await response.json();
    return data as msdyn_GetWidgetsDataResponse;
  }
}
