import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_RetrieveKPIValuesForGDPR action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKPIValuesForGDPRResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveKPIValuesForGDPRResponse;
  }
}
