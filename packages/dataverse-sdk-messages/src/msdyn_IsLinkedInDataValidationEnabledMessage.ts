import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IsLinkedInDataValidationEnabled request message
 *
 * Web API Action: msdyn_IsLinkedInDataValidationEnabled
 */
export class msdyn_IsLinkedInDataValidationEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsLinkedInDataValidationEnabledResponse>
{
  constructor() {
    super("msdyn_IsLinkedInDataValidationEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsLinkedInDataValidationEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsLinkedInDataValidationEnabledResponse> {
    const data = await response.json();
    return msdyn_IsLinkedInDataValidationEnabledResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_IsLinkedInDataValidationEnabled response message
 */
export class msdyn_IsLinkedInDataValidationEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsLinkedInDataValidationEnabledResponse) {
    super("msdyn_IsLinkedInDataValidationEnabled");
  }

  static fromResponse(data: unknown): msdyn_IsLinkedInDataValidationEnabledResponse {
    return new msdyn_IsLinkedInDataValidationEnabledResponse((data as any).value);
  }
}
