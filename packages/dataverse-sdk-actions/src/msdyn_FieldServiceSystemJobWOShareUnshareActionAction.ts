import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FieldServiceSystemJobWOShareUnshareAction action
 */
export interface msdyn_FieldServiceSystemJobWOShareUnshareActionResponse {
  OutputParamter: string;
}

/**
 * msdyn_FieldServiceSystemJobWOShareUnshareAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_fieldservicesystemjob)
 */
export class msdyn_FieldServiceSystemJobWOShareUnshareActionAction implements Executable<msdyn_FieldServiceSystemJobWOShareUnshareActionResponse> {
  constructor(
    public readonly msdyn_fieldservicesystemjobId: string,
    public readonly inputParameter: string,
    public readonly type: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fieldservicesystemjobs(${this.msdyn_fieldservicesystemjobId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceSystemJobWOShareUnshareAction`;

    const body: Record<string, unknown> = {
      InputParameter: this.inputParameter,
      Type: this.type,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_FieldServiceSystemJobWOShareUnshareActionResponse> {
    const data = await response.json();
    return data as msdyn_FieldServiceSystemJobWOShareUnshareActionResponse;
  }
}
