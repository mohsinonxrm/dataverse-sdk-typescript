import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_EmailValidationCustomAction request message
 *
 * Web API Action: msdyn_EmailValidationCustomAction
 */
export class msdyn_EmailValidationCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_EmailValidationCustomActionResponse>
{
  constructor(public emailValidationRequest: string) {
    super("msdyn_EmailValidationCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailValidationCustomAction`;

    const body: Record<string, unknown> = {
      EmailValidationRequest: this.emailValidationRequest,
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

  async parseResponse(response: Response): Promise<msdyn_EmailValidationCustomActionResponse> {
    const data = await response.json();
    return msdyn_EmailValidationCustomActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EmailValidationRequest: this.emailValidationRequest,
    };
  }
}

/**
 * msdyn_EmailValidationCustomAction response message
 */
export class msdyn_EmailValidationCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_EmailValidationCustomActionResponse) {
    super("msdyn_EmailValidationCustomAction");
  }

  static fromResponse(data: unknown): msdyn_EmailValidationCustomActionResponse {
    return new msdyn_EmailValidationCustomActionResponse((data as any).value);
  }
}
