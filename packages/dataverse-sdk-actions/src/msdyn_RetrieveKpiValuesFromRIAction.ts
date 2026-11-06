import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_RetrieveKpiValuesFromRI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKpiValuesFromRIResponse {
  "@odata.context"?: string;
  KpiValues: string;
}

/**
 * Parameters of the msdyn_RetrieveKpiValuesFromRI action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKpiValuesFromRIActionParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
  KpiType: string;
}

/**
 * msdyn_RetrieveKpiValuesFromRI action
 *
 * Unbound action
 */
export class msdyn_RetrieveKpiValuesFromRIAction implements Executable<msdyn_RetrieveKpiValuesFromRIResponse> {
  constructor(public readonly parameters: msdyn_RetrieveKpiValuesFromRIActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKpiValuesFromRI`;

    const body = requestBody({
      CrmRecord: this.parameters.CrmRecord,
      KpiType: this.parameters.KpiType,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKpiValuesFromRIResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveKpiValuesFromRIResponse;
  }
}
