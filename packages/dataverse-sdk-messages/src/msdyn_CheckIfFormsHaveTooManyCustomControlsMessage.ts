import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfFormsHaveTooManyCustomControls request message
 *
 * Web API Action: msdyn_CheckIfFormsHaveTooManyCustomControls
 */
export class msdyn_CheckIfFormsHaveTooManyCustomControlsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfFormsHaveTooManyCustomControlsResponse>
{
  constructor(
    public solutionName: string,
    public logicalNamesOfEntitiesToCheck: string,
    public notificationRecipientUserIds: string,
    public controlsAndLimits: string
  ) {
    super("msdyn_CheckIfFormsHaveTooManyCustomControls");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfFormsHaveTooManyCustomControls`;

    const body: Record<string, unknown> = {
      SolutionName: this.solutionName,
      LogicalNamesOfEntitiesToCheck: this.logicalNamesOfEntitiesToCheck,
      NotificationRecipientUserIds: this.notificationRecipientUserIds,
      ControlsAndLimits: this.controlsAndLimits,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfFormsHaveTooManyCustomControlsResponse> {
    const data = await response.json();
    return msdyn_CheckIfFormsHaveTooManyCustomControlsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionName: this.solutionName,
      LogicalNamesOfEntitiesToCheck: this.logicalNamesOfEntitiesToCheck,
      NotificationRecipientUserIds: this.notificationRecipientUserIds,
      ControlsAndLimits: this.controlsAndLimits,
    };
  }
}

/**
 * msdyn_CheckIfFormsHaveTooManyCustomControls response message
 */
export class msdyn_CheckIfFormsHaveTooManyCustomControlsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfFormsHaveTooManyCustomControlsResponse) {
    super("msdyn_CheckIfFormsHaveTooManyCustomControls");
  }

  static fromResponse(data: unknown): msdyn_CheckIfFormsHaveTooManyCustomControlsResponse {
    return new msdyn_CheckIfFormsHaveTooManyCustomControlsResponse((data as any).value);
  }
}
