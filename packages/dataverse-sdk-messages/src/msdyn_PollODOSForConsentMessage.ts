import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_PollODOSForConsent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PollODOSForConsentRequestParameters {
  InputData: string;
}

/**
 * msdyn_PollODOSForConsent request message
 *
 * Web API Action: msdyn_PollODOSForConsent
 */
export class msdyn_PollODOSForConsentRequest
  extends OrganizationRequest
  implements Executable<msdyn_PollODOSForConsentResponse>
{
  declare readonly Parameters: Readonly<msdyn_PollODOSForConsentRequestParameters>;

  constructor(parameters: msdyn_PollODOSForConsentRequestParameters) {
    super("msdyn_PollODOSForConsent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PollODOSForConsent`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  parseResponse(_response: Response): Promise<msdyn_PollODOSForConsentResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_PollODOSForConsentResponse());
  }
}

/**
 * msdyn_PollODOSForConsent response message
 */
export class msdyn_PollODOSForConsentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PollODOSForConsent");
  }

  static fromResponse(_data?: unknown): msdyn_PollODOSForConsentResponse {
    return new msdyn_PollODOSForConsentResponse();
  }
}
