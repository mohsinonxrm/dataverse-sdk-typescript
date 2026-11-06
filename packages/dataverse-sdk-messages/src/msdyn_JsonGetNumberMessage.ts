import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_JsonGetNumber message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_JsonGetNumberRequestParameters {
  Json?: string;
  PropertyPath: string;
  DefaultReturnValue?: number;
}

/**
 * msdyn_JsonGetNumber request message
 *
 * Web API Action: msdyn_JsonGetNumber
 */
export class msdyn_JsonGetNumberRequest
  extends OrganizationRequest
  implements Executable<msdyn_JsonGetNumberResponse>
{
  declare readonly Parameters: Readonly<msdyn_JsonGetNumberRequestParameters>;

  constructor(parameters: msdyn_JsonGetNumberRequestParameters) {
    super("msdyn_JsonGetNumber", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetNumber`;

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

  async parseResponse(response: Response): Promise<msdyn_JsonGetNumberResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_JsonGetNumberResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_JsonGetNumber action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_JsonGetNumberResult {
  "@odata.context"?: string;
  Value: number;
}

/**
 * msdyn_JsonGetNumber response message
 *
 * `result` is the value the msdyn_JsonGetNumber action returns (see {@link msdyn_JsonGetNumberResult}).
 */
export class msdyn_JsonGetNumberResponse extends OrganizationResponse {
  constructor(public result: msdyn_JsonGetNumberResult) {
    super("msdyn_JsonGetNumber");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_JsonGetNumberResponse {
    return new msdyn_JsonGetNumberResponse(data as msdyn_JsonGetNumberResult);
  }
}
