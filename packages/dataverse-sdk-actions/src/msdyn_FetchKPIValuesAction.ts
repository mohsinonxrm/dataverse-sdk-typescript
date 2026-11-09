import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_FetchKPIValues action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchKPIValuesResponse {
  "@odata.context"?: string;
  ErrorList: string;
  KPIValues: string;
  LastModifiedOn: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_FetchKPIValuesResponse;
  }
}
