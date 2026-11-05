import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GrantAccessUsingSharedLink request message
 *
 * Web API Action: GrantAccessUsingSharedLink
 */
export class GrantAccessUsingSharedLinkRequest
  extends OrganizationRequest
  implements Executable<GrantAccessUsingSharedLinkResponse>
{
  constructor(public recordUrlWithSharedLink: string) {
    super("GrantAccessUsingSharedLink");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GrantAccessUsingSharedLink`;

    const body: Record<string, unknown> = {
      RecordUrlWithSharedLink: this.recordUrlWithSharedLink,
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

  async parseResponse(response: Response): Promise<GrantAccessUsingSharedLinkResponse> {
    // No return value (204 No Content)
    return new GrantAccessUsingSharedLinkResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RecordUrlWithSharedLink: this.recordUrlWithSharedLink,
    };
  }
}

/**
 * GrantAccessUsingSharedLink response message
 */
export class GrantAccessUsingSharedLinkResponse extends OrganizationResponse {
  constructor() {
    super("GrantAccessUsingSharedLink");
  }

  static fromResponse(_data: unknown): GrantAccessUsingSharedLinkResponse {
    return new GrantAccessUsingSharedLinkResponse();
  }
}
