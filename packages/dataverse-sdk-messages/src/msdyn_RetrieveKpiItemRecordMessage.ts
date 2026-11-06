import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_RetrieveKpiItemRecordResponse as msdyn_RetrieveKpiItemRecordResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveKpiItemRecord request message
 *
 * Web API Action: msdyn_RetrieveKpiItemRecord
 */
export class msdyn_RetrieveKpiItemRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKpiItemRecordResponse>
{
  constructor(public crmRecord: EntityReference | AnyEntityPayload) {
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
}

/**
 * msdyn_RetrieveKpiItemRecord response message
 */
export class msdyn_RetrieveKpiItemRecordResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKpiItemRecordResponseData) {
    super("msdyn_RetrieveKpiItemRecord");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKpiItemRecordResponse {
    return new msdyn_RetrieveKpiItemRecordResponse(
      responseObject<msdyn_RetrieveKpiItemRecordResponseData>(data)
    );
  }
}
