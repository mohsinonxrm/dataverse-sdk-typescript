import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_PerformChecksForEnrichRecordResponse as msdyn_PerformChecksForEnrichRecordResponseData } from "./types/index.js";

/**
 * msdyn_PerformChecksForEnrichRecord request message
 *
 * Web API Action: msdyn_PerformChecksForEnrichRecord
 */
export class msdyn_PerformChecksForEnrichRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_PerformChecksForEnrichRecordResponse>
{
  constructor(public msdyn_Target: EntityReference | AnyEntityPayload) {
    super("msdyn_PerformChecksForEnrichRecord");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PerformChecksForEnrichRecord`;

    const body: Record<string, unknown> = {
      msdyn_Target: this.msdyn_Target,
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

  async parseResponse(response: Response): Promise<msdyn_PerformChecksForEnrichRecordResponse> {
    const data = await response.json();
    return msdyn_PerformChecksForEnrichRecordResponse.fromResponse(data);
  }
}

/**
 * msdyn_PerformChecksForEnrichRecord response message
 */
export class msdyn_PerformChecksForEnrichRecordResponse extends OrganizationResponse {
  constructor(public result: msdyn_PerformChecksForEnrichRecordResponseData) {
    super("msdyn_PerformChecksForEnrichRecord");
  }

  static fromResponse(data: unknown): msdyn_PerformChecksForEnrichRecordResponse {
    return new msdyn_PerformChecksForEnrichRecordResponse(
      responseObject<msdyn_PerformChecksForEnrichRecordResponseData>(data)
    );
  }
}
