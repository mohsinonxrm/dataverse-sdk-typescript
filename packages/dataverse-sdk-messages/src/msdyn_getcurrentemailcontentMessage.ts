import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_getcurrentemailcontent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getcurrentemailcontentRequestParameters {
  emailId: string;
}

/**
 * msdyn_getcurrentemailcontent request message
 *
 * Web API Action: msdyn_getcurrentemailcontent
 */
export class msdyn_getcurrentemailcontentRequest
  extends OrganizationRequest
  implements Executable<msdyn_getcurrentemailcontentResponse>
{
  declare readonly Parameters: Readonly<msdyn_getcurrentemailcontentRequestParameters>;

  constructor(parameters: msdyn_getcurrentemailcontentRequestParameters) {
    super("msdyn_getcurrentemailcontent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getcurrentemailcontent`;

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

  async parseResponse(response: Response): Promise<msdyn_getcurrentemailcontentResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_getcurrentemailcontentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_getcurrentemailcontent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getcurrentemailcontentResult {
  "@odata.context"?: string;
  currentEmailContent: string;
}

/**
 * msdyn_getcurrentemailcontent response message
 *
 * `result` is the value the msdyn_getcurrentemailcontent action returns (see {@link msdyn_getcurrentemailcontentResult}).
 */
export class msdyn_getcurrentemailcontentResponse extends OrganizationResponse {
  constructor(public result: msdyn_getcurrentemailcontentResult) {
    super("msdyn_getcurrentemailcontent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_getcurrentemailcontentResponse {
    return new msdyn_getcurrentemailcontentResponse(data as msdyn_getcurrentemailcontentResult);
  }
}
