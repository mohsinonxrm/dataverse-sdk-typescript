import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateApmEventHandler action
 */
export interface msdyn_CreateApmEventHandlerResponse {
  UpdateAppModuleResponse: string;
}

/**
 * msdyn_CreateApmEventHandler action
 *
 * Unbound action
 */
export class msdyn_CreateApmEventHandlerAction implements Executable<msdyn_CreateApmEventHandlerResponse> {
  constructor(public readonly appModuleId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateApmEventHandler`;

    const body: Record<string, unknown> = {
      AppModuleId: this.appModuleId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateApmEventHandlerResponse> {
    const data = await response.json();
    return data as msdyn_CreateApmEventHandlerResponse;
  }
}
