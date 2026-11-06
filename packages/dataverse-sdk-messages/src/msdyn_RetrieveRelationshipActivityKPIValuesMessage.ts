import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_RetrieveRelationshipActivityKPIValuesResponse as msdyn_RetrieveRelationshipActivityKPIValuesResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveRelationshipActivityKPIValues request message
 *
 * Web API Action: msdyn_RetrieveRelationshipActivityKPIValues
 */
export class msdyn_RetrieveRelationshipActivityKPIValuesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveRelationshipActivityKPIValuesResponse>
{
  constructor(
    public crmRecord: EntityReference | AnyEntityPayload,
    public getLinkedInKPI?: boolean
  ) {
    super("msdyn_RetrieveRelationshipActivityKPIValues");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveRelationshipActivityKPIValues`;

    const body: Record<string, unknown> = {
      CrmRecord: this.crmRecord,
      GetLinkedInKPI: this.getLinkedInKPI,
    };

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
    const data = await response.json();
    return msdyn_RetrieveRelationshipActivityKPIValuesResponse.fromResponse(data);
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
