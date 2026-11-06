import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_RetrieveKpiItemRecord action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKpiItemRecordResponse {
  "@odata.context"?: string;
  LastModifiedOn: string;
}

/**
 * Parameters of the msdyn_RetrieveKpiItemRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKpiItemRecordActionParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_RetrieveKpiItemRecord action
 *
 * Unbound action
 */
export class msdyn_RetrieveKpiItemRecordAction implements Executable<msdyn_RetrieveKpiItemRecordResponse> {
  constructor(public readonly parameters: msdyn_RetrieveKpiItemRecordActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKpiItemRecord`;

    const body = requestBody({
      CrmRecord: this.parameters.CrmRecord,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKpiItemRecordResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveKpiItemRecordResponse;
  }
}
