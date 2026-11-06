import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * msdyn_CheckIfFormsHaveTooManyCustomControls action
 *
 * Unbound action
 */
export class msdyn_CheckIfFormsHaveTooManyCustomControlsAction implements Executable<msdyn_CheckIfFormsHaveTooManyCustomControlsResponse> {
  constructor(
    public readonly solutionName?: string,
    public readonly logicalNamesOfEntitiesToCheck?: string,
    public readonly notificationRecipientUserIds?: string,
    public readonly controlsAndLimits?: string
  ) {}

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
    return data as msdyn_CheckIfFormsHaveTooManyCustomControlsResponse;
  }
}
