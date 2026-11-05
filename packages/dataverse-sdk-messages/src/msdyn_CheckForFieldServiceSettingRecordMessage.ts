import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckForFieldServiceSettingRecord response message
 */
export class msdyn_CheckForFieldServiceSettingRecordResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForFieldServiceSettingRecordResponse) {
    super("msdyn_CheckForFieldServiceSettingRecord");
  }

  static fromResponse(data: unknown): msdyn_CheckForFieldServiceSettingRecordResponse {
    return new msdyn_CheckForFieldServiceSettingRecordResponse((data as any).value);
  }
}
