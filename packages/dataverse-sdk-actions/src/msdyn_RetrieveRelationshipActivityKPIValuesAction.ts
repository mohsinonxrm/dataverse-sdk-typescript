import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
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
 * msdyn_RetrieveRelationshipActivityKPIValues action
 *
 * Unbound action
 */
export class msdyn_RetrieveRelationshipActivityKPIValuesAction implements Executable<msdyn_RetrieveRelationshipActivityKPIValuesResponse> {
  constructor(
    public readonly crmRecord: EntityReference | AnyEntityPayload,
    public readonly getLinkedInKPI?: boolean
  ) {}

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
    return data as msdyn_RetrieveRelationshipActivityKPIValuesResponse;
  }
}
