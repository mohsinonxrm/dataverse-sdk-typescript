import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GrantAccessUsingSharedLink message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GrantAccessUsingSharedLinkRequestParameters {
  RecordUrlWithSharedLink: string;
}

/**
 * GrantAccessUsingSharedLink request message
 *
 * Web API Action: GrantAccessUsingSharedLink
 */
export class GrantAccessUsingSharedLinkRequest
  extends OrganizationRequest
  implements Executable<GrantAccessUsingSharedLinkResponse>
{
  declare readonly Parameters: Readonly<GrantAccessUsingSharedLinkRequestParameters>;

  constructor(parameters: GrantAccessUsingSharedLinkRequestParameters) {
    super("GrantAccessUsingSharedLink", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GrantAccessUsingSharedLink`;

    const body = requestBody({
      RecordUrlWithSharedLink: this.Parameters.RecordUrlWithSharedLink,
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

  async parseResponse(response: Response): Promise<GrantAccessUsingSharedLinkResponse> {
    // No return value (204 No Content)
    return new GrantAccessUsingSharedLinkResponse();
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
