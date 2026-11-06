import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_RetrieveRelationshipActivityKPIValues message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveRelationshipActivityKPIValuesRequestParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
  GetLinkedInKPI?: boolean;
}

/**
 * msdyn_RetrieveRelationshipActivityKPIValues request message
 *
 * Web API Action: msdyn_RetrieveRelationshipActivityKPIValues
 */
export class msdyn_RetrieveRelationshipActivityKPIValuesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveRelationshipActivityKPIValuesResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveRelationshipActivityKPIValuesRequestParameters>;

  constructor(parameters: msdyn_RetrieveRelationshipActivityKPIValuesRequestParameters) {
    super("msdyn_RetrieveRelationshipActivityKPIValues", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveRelationshipActivityKPIValues`;

    const body = requestBody({
      CrmRecord: this.Parameters.CrmRecord,
      GetLinkedInKPI: this.Parameters.GetLinkedInKPI,
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
    return msdyn_RetrieveRelationshipActivityKPIValuesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveRelationshipActivityKPIValues action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveRelationshipActivityKPIValuesResult {
  "@odata.context"?: string;
  ErrorList: string;
  KPIValues: string;
  LastModifiedOn: string;
}

/**
 * msdyn_RetrieveRelationshipActivityKPIValues response message
 *
 * `result` is the value the msdyn_RetrieveRelationshipActivityKPIValues action returns (see {@link msdyn_RetrieveRelationshipActivityKPIValuesResult}).
 */
export class msdyn_RetrieveRelationshipActivityKPIValuesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveRelationshipActivityKPIValuesResult) {
    super("msdyn_RetrieveRelationshipActivityKPIValues");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveRelationshipActivityKPIValuesResponse {
    return new msdyn_RetrieveRelationshipActivityKPIValuesResponse(
      data as msdyn_RetrieveRelationshipActivityKPIValuesResult
    );
  }
}
