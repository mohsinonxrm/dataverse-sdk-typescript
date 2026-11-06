import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_FetchKPIValues action
 */
export interface msdyn_FetchKPIValuesResponse {
  LastModifiedOn: string;
  KPIValues: string;
  ErrorList: string;
}

/**
 * Parameters of the msdyn_FetchKPIValues action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchKPIValuesActionParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
  KPINames: string;
  KPIType?: string;
}

/**
 * msdyn_FetchKPIValues action
 *
 * Unbound action
 */
export class msdyn_FetchKPIValuesAction implements Executable<msdyn_FetchKPIValuesResponse> {
  constructor(public readonly parameters: msdyn_FetchKPIValuesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchKPIValues`;

    const body = requestBody({
      CrmRecord: this.parameters.CrmRecord,
      KPINames: this.parameters.KPINames,
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

  async parseResponse(response: Response): Promise<msdyn_FetchKPIValuesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_FetchKPIValuesResponse;
  }
}
