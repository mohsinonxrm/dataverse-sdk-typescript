import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_RetrieveKpiItemRecord request message
 *
 * Web API Action: msdyn_RetrieveKpiItemRecord
 */
export class msdyn_RetrieveKpiItemRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKpiItemRecordResponse>
{
  constructor(public crmRecord: EntityReference) {
    super("msdyn_RetrieveKpiItemRecord");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKpiItemRecord`;

    const body: Record<string, unknown> = {
      CrmRecord: this.crmRecord,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKpiItemRecordResponse> {
    const data = await response.json();
    return msdyn_RetrieveKpiItemRecordResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CrmRecord: this.crmRecord,
    };
  }
}

/**
 * msdyn_RetrieveKpiItemRecord response message
 */
export class msdyn_RetrieveKpiItemRecordResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKpiItemRecordResponse) {
    super("msdyn_RetrieveKpiItemRecord");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKpiItemRecordResponse {
    return new msdyn_RetrieveKpiItemRecordResponse((data as any).value);
  }
}
