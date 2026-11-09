import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_WaitKB message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_WaitKBRequestParameters {
  Context?: string;
  JitterPercentage?: number;
  Delay: number;
}

/**
 * msdyn_WaitKB request message
 *
 * Web API Action: msdyn_WaitKB
 */
export class msdyn_WaitKBRequest
  extends OrganizationRequest
  implements Executable<msdyn_WaitKBResponse>
{
  declare readonly Parameters: Readonly<msdyn_WaitKBRequestParameters>;

  constructor(parameters: msdyn_WaitKBRequestParameters) {
    super("msdyn_WaitKB", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WaitKB`;

    const body = requestBody({
      Context: this.Parameters.Context,
      JitterPercentage: this.Parameters.JitterPercentage,
      Delay: this.Parameters.Delay,
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

  async parseResponse(response: Response): Promise<msdyn_WaitKBResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_WaitKBResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_WaitKB action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WaitKBResult {
  "@odata.context"?: string;
  Response5: string;
}

/**
 * msdyn_WaitKB response message
 *
 * `result` is the value the msdyn_WaitKB action returns (see {@link msdyn_WaitKBResult}).
 */
export class msdyn_WaitKBResponse extends OrganizationResponse {
  constructor(public result: msdyn_WaitKBResult) {
    super("msdyn_WaitKB");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_WaitKBResponse {
    return new msdyn_WaitKBResponse(data as msdyn_WaitKBResult);
  }
}
