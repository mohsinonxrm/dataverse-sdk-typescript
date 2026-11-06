import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetLineOfBusinessOptionValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetLineOfBusinessOptionValueRequestParameters {
  RequestPayload: string;
}

/**
 * msdyn_GetLineOfBusinessOptionValue request message
 *
 * Web API Action: msdyn_GetLineOfBusinessOptionValue
 */
export class msdyn_GetLineOfBusinessOptionValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLineOfBusinessOptionValueResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetLineOfBusinessOptionValueRequestParameters>;

  constructor(parameters: msdyn_GetLineOfBusinessOptionValueRequestParameters) {
    super("msdyn_GetLineOfBusinessOptionValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLineOfBusinessOptionValue`;

    const body = requestBody({
      RequestPayload: this.Parameters.RequestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_GetLineOfBusinessOptionValueResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetLineOfBusinessOptionValueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetLineOfBusinessOptionValue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetLineOfBusinessOptionValueResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_GetLineOfBusinessOptionValue response message
 *
 * `result` is the value the msdyn_GetLineOfBusinessOptionValue action returns (see {@link msdyn_GetLineOfBusinessOptionValueResult}).
 */
export class msdyn_GetLineOfBusinessOptionValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLineOfBusinessOptionValueResult) {
    super("msdyn_GetLineOfBusinessOptionValue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetLineOfBusinessOptionValueResponse {
    return new msdyn_GetLineOfBusinessOptionValueResponse(
      data as msdyn_GetLineOfBusinessOptionValueResult
    );
  }
}
