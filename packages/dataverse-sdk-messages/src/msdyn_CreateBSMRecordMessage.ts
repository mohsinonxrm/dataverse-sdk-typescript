import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_CreateBSMRecordResponse as msdyn_CreateBSMRecordResponseData } from "./types/index.js";

/**
 * msdyn_CreateBSMRecord request message
 *
 * Web API Action: msdyn_CreateBSMRecord
 */
export class msdyn_CreateBSMRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateBSMRecordResponse>
{
  constructor(public analysisResult: EntityReference) {
    super("msdyn_CreateBSMRecord");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateBSMRecord`;

    const body: Record<string, unknown> = {
      AnalysisResult: this.analysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_CreateBSMRecordResponse> {
    const data = await response.json();
    return msdyn_CreateBSMRecordResponse.fromResponse(data);
  }
}

/**
 * msdyn_CreateBSMRecord response message
 */
export class msdyn_CreateBSMRecordResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateBSMRecordResponseData) {
    super("msdyn_CreateBSMRecord");
  }

  static fromResponse(data: unknown): msdyn_CreateBSMRecordResponse {
    return new msdyn_CreateBSMRecordResponse(
      responseObject<msdyn_CreateBSMRecordResponseData>(data)
    );
  }
}
