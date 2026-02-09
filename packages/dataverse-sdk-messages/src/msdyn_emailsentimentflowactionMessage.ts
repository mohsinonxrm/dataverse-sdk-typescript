import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_emailsentimentflowaction request message
 *
 * Web API Action: msdyn_emailsentimentflowaction
 */
export class msdyn_emailsentimentflowactionRequest
  extends OrganizationRequest
  implements Executable<msdyn_emailsentimentflowactionResponse>
{
  constructor(public emailId: string) {
    super("msdyn_emailsentimentflowaction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_emailsentimentflowaction`;

    const body: Record<string, unknown> = {
      emailId: this.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_emailsentimentflowactionResponse> {
    const data = await response.json();
    return msdyn_emailsentimentflowactionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      emailId: this.emailId,
    };
  }
}

/**
 * msdyn_emailsentimentflowaction response message
 */
export class msdyn_emailsentimentflowactionResponse extends OrganizationResponse {
  constructor(public result: msdyn_emailsentimentflowactionResponse) {
    super("msdyn_emailsentimentflowaction");
  }

  static fromResponse(data: unknown): msdyn_emailsentimentflowactionResponse {
    return new msdyn_emailsentimentflowactionResponse((data as any).value);
  }
}
