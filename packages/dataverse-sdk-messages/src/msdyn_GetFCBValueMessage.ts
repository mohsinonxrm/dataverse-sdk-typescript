import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetFCBValue request message
 *
 * Web API Action: msdyn_GetFCBValue
 */
export class msdyn_GetFCBValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFCBValueResponse>
{
  constructor(public fCBName: string) {
    super("msdyn_GetFCBValue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCBValue`;

    const body: Record<string, unknown> = {
      FCBName: this.fCBName,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCBValueResponse> {
    const data = await response.json();
    return msdyn_GetFCBValueResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FCBName: this.fCBName,
    };
  }
}

/**
 * msdyn_GetFCBValue response message
 */
export class msdyn_GetFCBValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFCBValueResponse) {
    super("msdyn_GetFCBValue");
  }

  static fromResponse(data: unknown): msdyn_GetFCBValueResponse {
    return new msdyn_GetFCBValueResponse((data as any).value);
  }
}
