import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_JsonGetString message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_JsonGetStringRequestParameters {
  Json?: string;
  PropertyPath: string;
  DefaultReturnValue?: string;
}

/**
 * msdyn_JsonGetString request message
 *
 * Web API Action: msdyn_JsonGetString
 */
export class msdyn_JsonGetStringRequest
  extends OrganizationRequest
  implements Executable<msdyn_JsonGetStringResponse>
{
  declare readonly Parameters: Readonly<msdyn_JsonGetStringRequestParameters>;

  constructor(parameters: msdyn_JsonGetStringRequestParameters) {
    super("msdyn_JsonGetString", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetString`;

    const body = requestBody({
      Json: this.Parameters.Json,
      PropertyPath: this.Parameters.PropertyPath,
      DefaultReturnValue: this.Parameters.DefaultReturnValue,
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

  async parseResponse(response: Response): Promise<msdyn_JsonGetStringResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_JsonGetStringResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_JsonGetString action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_JsonGetStringResult {
  "@odata.context"?: string;
  Value: string;
}

/**
 * msdyn_JsonGetString response message
 *
 * `result` is the value the msdyn_JsonGetString action returns (see {@link msdyn_JsonGetStringResult}).
 */
export class msdyn_JsonGetStringResponse extends OrganizationResponse {
  constructor(public result: msdyn_JsonGetStringResult) {
    super("msdyn_JsonGetString");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_JsonGetStringResponse {
    return new msdyn_JsonGetStringResponse(data as msdyn_JsonGetStringResult);
  }
}
