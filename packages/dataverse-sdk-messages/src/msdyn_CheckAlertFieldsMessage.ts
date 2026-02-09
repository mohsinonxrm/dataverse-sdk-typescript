import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckAlertFields request message
 *
 * Web API Action: msdyn_CheckAlertFields
 */
export class msdyn_CheckAlertFieldsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckAlertFieldsResponse>
{
  constructor() {
    super("msdyn_CheckAlertFields");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckAlertFields`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckAlertFieldsResponse> {
    const data = await response.json();
    return msdyn_CheckAlertFieldsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckAlertFields response message
 */
export class msdyn_CheckAlertFieldsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckAlertFieldsResponse) {
    super("msdyn_CheckAlertFields");
  }

  static fromResponse(data: unknown): msdyn_CheckAlertFieldsResponse {
    return new msdyn_CheckAlertFieldsResponse((data as any).value);
  }
}
