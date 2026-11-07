import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CheckIfFormsHaveTooManyCustomControls action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfFormsHaveTooManyCustomControlsResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_CheckIfFormsHaveTooManyCustomControls action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfFormsHaveTooManyCustomControlsActionParameters {
  SolutionName?: string;
  LogicalNamesOfEntitiesToCheck?: string;
  NotificationRecipientUserIds?: string;
  ControlsAndLimits?: string;
}

/**
 * msdyn_CheckIfFormsHaveTooManyCustomControls action
 *
 * Unbound action
 */
export class msdyn_CheckIfFormsHaveTooManyCustomControlsAction implements Executable<msdyn_CheckIfFormsHaveTooManyCustomControlsResponse> {
  constructor(
    public readonly parameters: msdyn_CheckIfFormsHaveTooManyCustomControlsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfFormsHaveTooManyCustomControls`;

    const body = requestBody({
      SolutionName: this.parameters.SolutionName,
      LogicalNamesOfEntitiesToCheck: this.parameters.LogicalNamesOfEntitiesToCheck,
      NotificationRecipientUserIds: this.parameters.NotificationRecipientUserIds,
      ControlsAndLimits: this.parameters.ControlsAndLimits,
    });

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfFormsHaveTooManyCustomControlsResponse;
  }
}
