import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_PollODOSForConsent request message
 *
 * Web API Action: msdyn_PollODOSForConsent
 */
export class msdyn_PollODOSForConsentRequest
  extends OrganizationRequest
  implements Executable<msdyn_PollODOSForConsentResponse>
{
  constructor(public inputData: string) {
    super("msdyn_PollODOSForConsent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PollODOSForConsent`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_PollODOSForConsentResponse> {
    // No return value (204 No Content)
    return new msdyn_PollODOSForConsentResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
  }
}

/**
 * msdyn_PollODOSForConsent response message
 */
export class msdyn_PollODOSForConsentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PollODOSForConsent");
  }

  static fromResponse(_data: unknown): msdyn_PollODOSForConsentResponse {
    return new msdyn_PollODOSForConsentResponse();
  }
}
