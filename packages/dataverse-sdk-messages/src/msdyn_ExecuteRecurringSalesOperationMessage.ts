import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ExecuteRecurringSalesOperation request message
 *
 * Web API Action: msdyn_ExecuteRecurringSalesOperation
 */
export class msdyn_ExecuteRecurringSalesOperationRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteRecurringSalesOperationResponse>
{
  constructor(
    public inputData: string,
    public isRSAV2Entity: boolean,
    public customActionName: string,
    public triggerName: string
  ) {
    super("msdyn_ExecuteRecurringSalesOperation");
  }

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
    return new msdyn_ExecuteRecurringSalesOperationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
      IsRSAV2Entity: this.isRSAV2Entity,
      CustomActionName: this.customActionName,
      TriggerName: this.triggerName,
    };
  }
}

/**
 * msdyn_ExecuteRecurringSalesOperation response message
 */
export class msdyn_ExecuteRecurringSalesOperationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ExecuteRecurringSalesOperation");
  }

  static fromResponse(_data: unknown): msdyn_ExecuteRecurringSalesOperationResponse {
    return new msdyn_ExecuteRecurringSalesOperationResponse();
  }
}
