import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_BookRequirementGroup action
 */
export interface msdyn_BookRequirementGroupResponse {
  BookingResult: string;
}

/**
 * Parameters of the msdyn_BookRequirementGroup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BookRequirementGroupActionParameters {
  Start: string;
  Duration: number;
  BookingResources: string;
}

/**
 * msdyn_BookRequirementGroup action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_requirementgroup)
 *
 * The first argument is the id of the msdyn_requirementgroup record to call it on.
 */
export class msdyn_BookRequirementGroupAction implements Executable<msdyn_BookRequirementGroupResponse> {
  constructor(
    public readonly msdyn_requirementgroupId: string,
    public readonly parameters: msdyn_BookRequirementGroupActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_requirementgroups(${this.msdyn_requirementgroupId})/Microsoft.Dynamics.CRM.msdyn_BookRequirementGroup`;

    const body = requestBody({
      Start: this.parameters.Start,
      Duration: this.parameters.Duration,
      BookingResources: this.parameters.BookingResources,
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

  async parseResponse(response: Response): Promise<msdyn_BookRequirementGroupResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_BookRequirementGroupResponse;
  }
}
