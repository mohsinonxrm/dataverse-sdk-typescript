import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetLeadCallPrepSheetDetails request message
 *
 * Web API Action: msdyn_GetLeadCallPrepSheetDetails
 */
export class msdyn_GetLeadCallPrepSheetDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLeadCallPrepSheetDetailsResponse>
{
  constructor(public msdyn_leadid: string) {
    super("msdyn_GetLeadCallPrepSheetDetails");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLeadCallPrepSheetDetails`;

    const body: Record<string, unknown> = {
      msdyn_leadid: this.msdyn_leadid,
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

  async parseResponse(response: Response): Promise<msdyn_GetLeadCallPrepSheetDetailsResponse> {
    const data = await response.json();
    return msdyn_GetLeadCallPrepSheetDetailsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_leadid: this.msdyn_leadid,
    };
  }
}

/**
 * msdyn_GetLeadCallPrepSheetDetails response message
 */
export class msdyn_GetLeadCallPrepSheetDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLeadCallPrepSheetDetailsResponse) {
    super("msdyn_GetLeadCallPrepSheetDetails");
  }

  static fromResponse(data: unknown): msdyn_GetLeadCallPrepSheetDetailsResponse {
    return new msdyn_GetLeadCallPrepSheetDetailsResponse((data as any).value);
  }
}
