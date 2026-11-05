import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ScheduleRetrain action
 */
export interface ScheduleRetrainResponse {
  response: string;
}

/**
 * ScheduleRetrain action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 */
export class ScheduleRetrainAction implements Executable<ScheduleRetrainResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly recurrence: string,
    public readonly version: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.ScheduleRetrain`;

    const body: Record<string, unknown> = {
      recurrence: this.recurrence,
      version: this.version,
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

  async parseResponse(response: Response): Promise<ScheduleRetrainResponse> {
    const data = await response.json();
    return data as ScheduleRetrainResponse;
  }
}
