import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckBookingCustomControlUsage action
 */
export interface msdyn_CheckBookingCustomControlUsageResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
}

/**
 * msdyn_CheckBookingCustomControlUsage action
 *
 * Unbound action
 */
export class msdyn_CheckBookingCustomControlUsageAction implements Executable<msdyn_CheckBookingCustomControlUsageResponse> {
  constructor(public readonly solutionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckBookingCustomControlUsage`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckBookingCustomControlUsageResponse> {
    const data = await response.json();
    return data as msdyn_CheckBookingCustomControlUsageResponse;
  }
}
