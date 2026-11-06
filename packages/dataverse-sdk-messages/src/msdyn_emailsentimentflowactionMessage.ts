import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_emailsentimentflowactionResponse as msdyn_emailsentimentflowactionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_emailsentimentflowaction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_emailsentimentflowactionRequestParameters {
  emailId: string;
}

/**
 * msdyn_emailsentimentflowaction request message
 *
 * Web API Action: msdyn_emailsentimentflowaction
 */
export class msdyn_emailsentimentflowactionRequest
  extends OrganizationRequest
  implements Executable<msdyn_emailsentimentflowactionResponse>
{
  declare readonly Parameters: Readonly<msdyn_emailsentimentflowactionRequestParameters>;

  constructor(parameters: msdyn_emailsentimentflowactionRequestParameters) {
    super("msdyn_emailsentimentflowaction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_emailsentimentflowaction`;

    const body = requestBody({
      emailId: this.Parameters.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_emailsentimentflowactionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_emailsentimentflowactionResponse.fromResponse({});
    return msdyn_emailsentimentflowactionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_emailsentimentflowaction response message
 */
export class msdyn_emailsentimentflowactionResponse extends OrganizationResponse {
  constructor(public result: msdyn_emailsentimentflowactionResponseData) {
    super("msdyn_emailsentimentflowaction");
  }

  static fromResponse(data: unknown): msdyn_emailsentimentflowactionResponse {
    return new msdyn_emailsentimentflowactionResponse(
      responseObject<msdyn_emailsentimentflowactionResponseData>(data)
    );
  }
}
