import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_McMcbyValues action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_McMcbyValuesResponse {
  "@odata.context"?: string;
  LastModifiedOn: string;
}

/**
 * Parameters of the msdyn_McMcbyValues action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_McMcbyValuesActionParameters {
  CrmRecord?: EntityReference | AnyEntityPayload;
  KPIType?: string;
}

/**
 * msdyn_McMcbyValues action
 *
 * Unbound action
 */
export class msdyn_McMcbyValuesAction implements Executable<msdyn_McMcbyValuesResponse> {
  constructor(public readonly parameters: msdyn_McMcbyValuesActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_McMcbyValues`;

    const body = requestBody({
      CrmRecord: this.parameters.CrmRecord,
      KPIType: this.parameters.KPIType,
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

  async parseResponse(response: Response): Promise<msdyn_McMcbyValuesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_McMcbyValuesResponse;
  }
}
