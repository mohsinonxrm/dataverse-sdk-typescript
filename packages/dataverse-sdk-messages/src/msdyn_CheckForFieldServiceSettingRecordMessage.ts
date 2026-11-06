import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForFieldServiceSettingRecordResponse as msdyn_CheckForFieldServiceSettingRecordResponseData } from "./types/index.js";

/**
 * msdyn_CheckForFieldServiceSettingRecord request message
 *
 * Web API Action: msdyn_CheckForFieldServiceSettingRecord
 */
export class msdyn_CheckForFieldServiceSettingRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForFieldServiceSettingRecordResponse>
{
  constructor() {
    super("msdyn_CheckForFieldServiceSettingRecord");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForFieldServiceSettingRecord`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckForFieldServiceSettingRecordResponse> {
    const data = await response.json();
    return msdyn_CheckForFieldServiceSettingRecordResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckForFieldServiceSettingRecord response message
 */
export class msdyn_CheckForFieldServiceSettingRecordResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForFieldServiceSettingRecordResponseData) {
    super("msdyn_CheckForFieldServiceSettingRecord");
  }

  static fromResponse(data: unknown): msdyn_CheckForFieldServiceSettingRecordResponse {
    return new msdyn_CheckForFieldServiceSettingRecordResponse(
      responseObject<msdyn_CheckForFieldServiceSettingRecordResponseData>(data)
    );
  }
}
