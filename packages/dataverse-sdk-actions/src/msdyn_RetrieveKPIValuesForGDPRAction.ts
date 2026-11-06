import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_RetrieveKPIValuesForGDPR action
 */
export interface msdyn_RetrieveKPIValuesForGDPRResponse {
  Response: string;
}

/**
 * Parameters of the msdyn_RetrieveKPIValuesForGDPR action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKPIValuesForGDPRActionParameters {
  CRMRecord: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_RetrieveKPIValuesForGDPR action
 *
 * Unbound action
 */
export class msdyn_RetrieveKPIValuesForGDPRAction implements Executable<msdyn_RetrieveKPIValuesForGDPRResponse> {
  constructor(public readonly parameters: msdyn_RetrieveKPIValuesForGDPRActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKPIValuesForGDPR`;

    const body = requestBody({
      CRMRecord: this.parameters.CRMRecord,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKPIValuesForGDPRResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RetrieveKPIValuesForGDPRResponse;
  }
}
