import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetDynamicFieldsForActionType action
 */
export interface msdyn_GetDynamicFieldsForActionTypeResponse {
  dynamicSchema: string;
}

/**
 * msdyn_GetDynamicFieldsForActionType action
 *
 * Unbound action
 */
export class msdyn_GetDynamicFieldsForActionTypeAction implements Executable<msdyn_GetDynamicFieldsForActionTypeResponse> {
  constructor(
    public readonly correlationId: string,
    public readonly workflowId: string,
    public readonly secondaryActionType: string,
    public readonly actionType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDynamicFieldsForActionType`;

    const body: Record<string, unknown> = {
      correlationId: this.correlationId,
      workflowId: this.workflowId,
      secondaryActionType: this.secondaryActionType,
      actionType: this.actionType,
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

  async parseResponse(response: Response): Promise<msdyn_GetDynamicFieldsForActionTypeResponse> {
    const data = await response.json();
    return data as msdyn_GetDynamicFieldsForActionTypeResponse;
  }
}
