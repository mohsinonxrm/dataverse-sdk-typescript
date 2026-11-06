import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetFCBValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFCBValueRequestParameters {
  FCBName: string;
}

/**
 * msdyn_GetFCBValue request message
 *
 * Web API Action: msdyn_GetFCBValue
 */
export class msdyn_GetFCBValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFCBValueResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFCBValueRequestParameters>;

  constructor(parameters: msdyn_GetFCBValueRequestParameters) {
    super("msdyn_GetFCBValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCBValue`;

    const body = requestBody({
      FCBName: this.Parameters.FCBName,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCBValueResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetFCBValueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetFCBValue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetFCBValueResult {
  "@odata.context"?: string;
  FCBValue: boolean;
}

/**
 * msdyn_GetFCBValue response message
 *
 * `result` is the value the msdyn_GetFCBValue action returns (see {@link msdyn_GetFCBValueResult}).
 */
export class msdyn_GetFCBValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFCBValueResult) {
    super("msdyn_GetFCBValue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetFCBValueResponse {
    return new msdyn_GetFCBValueResponse(data as msdyn_GetFCBValueResult);
  }
}
