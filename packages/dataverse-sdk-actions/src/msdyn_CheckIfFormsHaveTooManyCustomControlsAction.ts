import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckIfFormsHaveTooManyCustomControls action
 */
export interface msdyn_CheckIfFormsHaveTooManyCustomControlsResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  HelpLink: string;
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckIfFormsHaveTooManyCustomControlsResponse;
  }
}
