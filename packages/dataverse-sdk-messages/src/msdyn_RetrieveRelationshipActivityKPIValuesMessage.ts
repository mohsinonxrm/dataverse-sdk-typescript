import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_RetrieveRelationshipActivityKPIValuesResponse as msdyn_RetrieveRelationshipActivityKPIValuesResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_RetrieveRelationshipActivityKPIValuesResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_RetrieveRelationshipActivityKPIValues response message
 */
export class msdyn_RetrieveRelationshipActivityKPIValuesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveRelationshipActivityKPIValuesResponseData) {
    super("msdyn_RetrieveRelationshipActivityKPIValues");
  }

  static fromResponse(data: unknown): msdyn_RetrieveRelationshipActivityKPIValuesResponse {
    return new msdyn_RetrieveRelationshipActivityKPIValuesResponse(
      responseObject<msdyn_RetrieveRelationshipActivityKPIValuesResponseData>(data)
    );
  }
}
