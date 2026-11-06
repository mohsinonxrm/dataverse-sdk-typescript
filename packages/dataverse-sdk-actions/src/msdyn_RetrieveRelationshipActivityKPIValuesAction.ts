import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_RetrieveRelationshipActivityKPIValues action
 */
export interface msdyn_RetrieveRelationshipActivityKPIValuesResponse {
  LastModifiedOn: string;
  ErrorList: string;
  KPIValues: string;
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RetrieveRelationshipActivityKPIValuesResponse;
    return (await response.json()) as msdyn_RetrieveRelationshipActivityKPIValuesResponse;
  }
}
