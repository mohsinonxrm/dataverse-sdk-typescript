import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetCustomActionParameters action
 */
export interface msdyn_GetCustomActionParametersResponse {
  dynamicSchema: string;
}

/**
 * msdyn_GetCustomActionParameters action
 *
 * Unbound action
 */
export class msdyn_GetCustomActionParametersAction implements Executable<msdyn_GetCustomActionParametersResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly customAction: string,
    public readonly correlationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCustomActionParameters`;

    const body: Record<string, unknown> = {
      workflowId: this.workflowId,
      customAction: this.customAction,
      correlationId: this.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_GetCustomActionParametersResponse> {
    const data = await response.json();
    return data as msdyn_GetCustomActionParametersResponse;
  }
}
