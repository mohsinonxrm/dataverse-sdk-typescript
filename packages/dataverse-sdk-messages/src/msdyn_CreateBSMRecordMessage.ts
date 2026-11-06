import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateBSMRecordResponse as msdyn_CreateBSMRecordResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateBSMRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateBSMRecordRequestParameters {
  AnalysisResult: EntityReference;
}

/**
 * msdyn_CreateBSMRecord request message
 *
 * Web API Action: msdyn_CreateBSMRecord
 */
export class msdyn_CreateBSMRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateBSMRecordResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateBSMRecordRequestParameters>;

  constructor(parameters: msdyn_CreateBSMRecordRequestParameters) {
    super("msdyn_CreateBSMRecord", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateBSMRecord`;

    const body = requestBody({
      AnalysisResult: this.Parameters.AnalysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_CreateBSMRecordResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreateBSMRecordResponse.fromResponse({});
    return msdyn_CreateBSMRecordResponse.fromResponse(await response.json());
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
