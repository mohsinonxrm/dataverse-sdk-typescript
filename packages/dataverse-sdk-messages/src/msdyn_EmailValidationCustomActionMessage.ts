import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_EmailValidationCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailValidationCustomActionRequestParameters {
  EmailValidationRequest?: string;
}

/**
 * msdyn_EmailValidationCustomAction request message
 *
 * Web API Action: msdyn_EmailValidationCustomAction
 */
export class msdyn_EmailValidationCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_EmailValidationCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_EmailValidationCustomActionRequestParameters>;

  constructor(parameters: msdyn_EmailValidationCustomActionRequestParameters = {}) {
    super("msdyn_EmailValidationCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailValidationCustomAction`;

    const body = requestBody({
      EmailValidationRequest: this.Parameters.EmailValidationRequest,
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

  async parseResponse(response: Response): Promise<msdyn_EmailValidationCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_EmailValidationCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_EmailValidationCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EmailValidationCustomActionResult {
  "@odata.context"?: string;
  EmailValidationResponse: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  StatusCode: number;
}

/**
 * msdyn_EmailValidationCustomAction response message
 *
 * `result` is the value the msdyn_EmailValidationCustomAction action returns (see {@link msdyn_EmailValidationCustomActionResult}).
 */
export class msdyn_EmailValidationCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_EmailValidationCustomActionResult) {
    super("msdyn_EmailValidationCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_EmailValidationCustomActionResponse {
    return new msdyn_EmailValidationCustomActionResponse(
      data as msdyn_EmailValidationCustomActionResult
    );
  }
}
