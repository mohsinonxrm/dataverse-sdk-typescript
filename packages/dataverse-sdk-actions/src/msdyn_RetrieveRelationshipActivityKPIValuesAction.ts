import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_RetrieveRelationshipActivityKPIValues action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveRelationshipActivityKPIValuesResponse {
  "@odata.context"?: string;
  ErrorList: string;
  KPIValues: string;
  LastModifiedOn: string;
}

/**
 * Parameters of the msdyn_RetrieveRelationshipActivityKPIValues action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveRelationshipActivityKPIValuesActionParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
  GetLinkedInKPI?: boolean;
}

/**
 * msdyn_RetrieveRelationshipActivityKPIValues action
 *
 * Unbound action
 */
export class msdyn_RetrieveRelationshipActivityKPIValuesAction implements Executable<msdyn_RetrieveRelationshipActivityKPIValuesResponse> {
  constructor(
    public readonly parameters: msdyn_RetrieveRelationshipActivityKPIValuesActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveRelationshipActivityKPIValues`;

    const body = requestBody({
      CrmRecord: this.parameters.CrmRecord,
      GetLinkedInKPI: this.parameters.GetLinkedInKPI,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_RetrieveRelationshipActivityKPIValuesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveRelationshipActivityKPIValuesResponse;
  }
}
