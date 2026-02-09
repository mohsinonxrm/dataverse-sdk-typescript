import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateWorkOrder action
 */
export interface msdyn_CreateWorkOrderResponse {
  output: string;
}

/**
 * msdyn_CreateWorkOrder action
 *
 * Unbound action
 */
export class msdyn_CreateWorkOrderAction implements Executable<msdyn_CreateWorkOrderResponse> {
  constructor(public readonly input: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateWorkOrder`;

    const body: Record<string, unknown> = {
      input: this.input,
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

  async parseResponse(response: Response): Promise<msdyn_CreateWorkOrderResponse> {
    const data = await response.json();
    return data as msdyn_CreateWorkOrderResponse;
  }
}
