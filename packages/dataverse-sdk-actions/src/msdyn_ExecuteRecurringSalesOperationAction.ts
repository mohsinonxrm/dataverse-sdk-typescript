import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExecuteRecurringSalesOperation action
 */
export interface msdyn_ExecuteRecurringSalesOperationResponse {
  // No content returned
}

/**
 * msdyn_ExecuteRecurringSalesOperation action
 *
 * Unbound action
 */
export class msdyn_ExecuteRecurringSalesOperationAction implements Executable<msdyn_ExecuteRecurringSalesOperationResponse> {
  constructor(
    public readonly inputData: string,
    public readonly isRSAV2Entity: boolean,
    public readonly customActionName: string,
    public readonly triggerName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteRecurringSalesOperation`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
      IsRSAV2Entity: this.isRSAV2Entity,
      CustomActionName: this.customActionName,
      TriggerName: this.triggerName,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteRecurringSalesOperationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
