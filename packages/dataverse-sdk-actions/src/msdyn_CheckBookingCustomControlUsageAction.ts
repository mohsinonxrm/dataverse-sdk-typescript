import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the msdyn_CheckBookingCustomControlUsage action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckBookingCustomControlUsageActionParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckBookingCustomControlUsage action
 *
 * Unbound action
 */
export class msdyn_CheckBookingCustomControlUsageAction implements Executable<msdyn_CheckBookingCustomControlUsageResponse> {
  constructor(public readonly parameters: msdyn_CheckBookingCustomControlUsageActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckBookingCustomControlUsage`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckBookingCustomControlUsageResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckBookingCustomControlUsageResponse;
    return (await response.json()) as msdyn_CheckBookingCustomControlUsageResponse;
  }
}
