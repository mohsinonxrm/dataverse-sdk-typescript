import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_RetrieveKpiValuesFromRI action
 */
export interface msdyn_RetrieveKpiValuesFromRIResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RetrieveKpiValuesFromRIResponse;
  }
}
