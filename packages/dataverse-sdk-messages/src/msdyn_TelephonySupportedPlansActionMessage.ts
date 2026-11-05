import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TelephonySupportedPlansAction request message
 *
 * Web API Action: msdyn_TelephonySupportedPlansAction
 */
export class msdyn_TelephonySupportedPlansActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonySupportedPlansActionResponse>
{
  constructor(public actionRequest: string) {
    super("msdyn_TelephonySupportedPlansAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonySupportedPlansAction`;

    const body: Record<string, unknown> = {
      ActionRequest: this.actionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_TelephonySupportedPlansActionResponse> {
    const data = await response.json();
    return msdyn_TelephonySupportedPlansActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ActionRequest: this.actionRequest,
    };
  }
}

/**
 * msdyn_TelephonySupportedPlansAction response message
 */
export class msdyn_TelephonySupportedPlansActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonySupportedPlansActionResponse) {
    super("msdyn_TelephonySupportedPlansAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonySupportedPlansActionResponse {
    return new msdyn_TelephonySupportedPlansActionResponse((data as any).value);
  }
}
