import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_emailsentimentflowactionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_emailsentimentflowaction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_emailsentimentflowactionResult {
  "@odata.context"?: string;
  emailSentimentResponse: string;
}

/**
 * msdyn_emailsentimentflowaction response message
 *
 * `result` is the value the msdyn_emailsentimentflowaction action returns (see {@link msdyn_emailsentimentflowactionResult}).
 */
export class msdyn_emailsentimentflowactionResponse extends OrganizationResponse {
  constructor(public result: msdyn_emailsentimentflowactionResult) {
    super("msdyn_emailsentimentflowaction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_emailsentimentflowactionResponse {
    return new msdyn_emailsentimentflowactionResponse(data as msdyn_emailsentimentflowactionResult);
  }
}
