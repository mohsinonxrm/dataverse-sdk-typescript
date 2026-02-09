import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IoTRegisterActionHandler action
 */
export interface msdyn_IoTRegisterActionHandlerResponse {
  RegistrationResultsJSON: string;
}

/**
 * msdyn_IoTRegisterActionHandler action
 *
 * Unbound action
 */
export class msdyn_IoTRegisterActionHandlerAction implements Executable<msdyn_IoTRegisterActionHandlerResponse> {
  constructor(public readonly entityCollection: Record<string, unknown>[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTRegisterActionHandler`;

    const body: Record<string, unknown> = {
      EntityCollection: this.entityCollection,
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

  async parseResponse(response: Response): Promise<msdyn_IoTRegisterActionHandlerResponse> {
    const data = await response.json();
    return data as msdyn_IoTRegisterActionHandlerResponse;
  }
}
