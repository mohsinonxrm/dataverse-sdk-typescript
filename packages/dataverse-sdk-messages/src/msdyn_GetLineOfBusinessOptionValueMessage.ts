import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetLineOfBusinessOptionValue request message
 *
 * Web API Action: msdyn_GetLineOfBusinessOptionValue
 */
export class msdyn_GetLineOfBusinessOptionValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLineOfBusinessOptionValueResponse>
{
  constructor(public requestPayload: string) {
    super("msdyn_GetLineOfBusinessOptionValue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLineOfBusinessOptionValue`;

    const body: Record<string, unknown> = {
      RequestPayload: this.requestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_GetLineOfBusinessOptionValueResponse> {
    const data = await response.json();
    return msdyn_GetLineOfBusinessOptionValueResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RequestPayload: this.requestPayload,
    };
  }
}

/**
 * msdyn_GetLineOfBusinessOptionValue response message
 */
export class msdyn_GetLineOfBusinessOptionValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLineOfBusinessOptionValueResponse) {
    super("msdyn_GetLineOfBusinessOptionValue");
  }

  static fromResponse(data: unknown): msdyn_GetLineOfBusinessOptionValueResponse {
    return new msdyn_GetLineOfBusinessOptionValueResponse((data as any).value);
  }
}
