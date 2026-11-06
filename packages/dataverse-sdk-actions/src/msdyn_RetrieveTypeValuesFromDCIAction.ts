import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_RetrieveTypeValuesFromDCI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveTypeValuesFromDCIResponse {
  "@odata.context"?: string;
  ResponseValues: string;
}

/**
 * Parameters of the msdyn_RetrieveTypeValuesFromDCI action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveTypeValuesFromDCIActionParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
  ResourceType: number;
  ResourceTypeName: string;
  StartDate?: string;
  EndDate?: string;
}

/**
 * msdyn_RetrieveTypeValuesFromDCI action
 *
 * Unbound action
 */
export class msdyn_RetrieveTypeValuesFromDCIAction implements Executable<msdyn_RetrieveTypeValuesFromDCIResponse> {
  constructor(public readonly parameters: msdyn_RetrieveTypeValuesFromDCIActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveTypeValuesFromDCI`;

    const body = requestBody({
      CrmRecord: this.parameters.CrmRecord,
      ResourceType: this.parameters.ResourceType,
      ResourceTypeName: this.parameters.ResourceTypeName,
      StartDate: this.parameters.StartDate,
      EndDate: this.parameters.EndDate,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveTypeValuesFromDCIResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveTypeValuesFromDCIResponse;
  }
}
