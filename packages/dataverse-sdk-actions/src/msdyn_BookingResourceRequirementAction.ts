import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_BookingResourceRequirement action
 */
export interface msdyn_BookingResourceRequirementResponse {
  BookingResult: string;
}

/**
 * Parameters of the msdyn_BookingResourceRequirement action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BookingResourceRequirementActionParameters {
  ResourceId: string;
  BookingStatusId: string;
  BookingMethod: number;
  BookingType: number;
  StartDateTime: string;
  EndDateTime: string;
  Timeframe?: number;
  Hours?: number;
  Percentage?: number;
}

/**
 * msdyn_BookingResourceRequirement action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_resourcerequirement)
 *
 * The first argument is the id of the msdyn_resourcerequirement record to call it on.
 */
export class msdyn_BookingResourceRequirementAction implements Executable<msdyn_BookingResourceRequirementResponse> {
  constructor(
    public readonly msdyn_resourcerequirementId: string,
    public readonly parameters: msdyn_BookingResourceRequirementActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_resourcerequirements(${this.msdyn_resourcerequirementId})/Microsoft.Dynamics.CRM.msdyn_BookingResourceRequirement`;

    const body = requestBody({
      ResourceId: this.parameters.ResourceId,
      BookingStatusId: this.parameters.BookingStatusId,
      BookingMethod: this.parameters.BookingMethod,
      BookingType: this.parameters.BookingType,
      StartDateTime: this.parameters.StartDateTime,
      EndDateTime: this.parameters.EndDateTime,
      Timeframe: this.parameters.Timeframe,
      Hours: this.parameters.Hours,
      Percentage: this.parameters.Percentage,
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

  async parseResponse(response: Response): Promise<msdyn_BookingResourceRequirementResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_BookingResourceRequirementResponse;
    return (await response.json()) as msdyn_BookingResourceRequirementResponse;
  }
}
