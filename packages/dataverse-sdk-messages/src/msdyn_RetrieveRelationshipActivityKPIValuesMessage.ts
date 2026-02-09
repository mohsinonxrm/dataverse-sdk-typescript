import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
    public crmRecord: EntityReference,
    public getLinkedInKPI: boolean
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
        "Content-Type": "application/json",
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

  toRequestBody(): Record<string, unknown> {
    return {
      CrmRecord: this.crmRecord,
      GetLinkedInKPI: this.getLinkedInKPI,
    };
  }
}

/**
 * msdyn_RetrieveRelationshipActivityKPIValues response message
 */
export class msdyn_RetrieveRelationshipActivityKPIValuesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveRelationshipActivityKPIValuesResponse) {
    super("msdyn_RetrieveRelationshipActivityKPIValues");
  }

  static fromResponse(data: unknown): msdyn_RetrieveRelationshipActivityKPIValuesResponse {
    return new msdyn_RetrieveRelationshipActivityKPIValuesResponse((data as any).value);
  }
}
