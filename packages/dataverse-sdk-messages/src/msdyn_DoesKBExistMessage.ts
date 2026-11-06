import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DoesKBExist message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DoesKBExistRequestParameters {
  HarvestWorkItemResponse: string;
  CSCopilotRequest: string;
}

/**
 * msdyn_DoesKBExist request message
 *
 * Web API Action: msdyn_DoesKBExist
 */
export class msdyn_DoesKBExistRequest
  extends OrganizationRequest
  implements Executable<msdyn_DoesKBExistResponse>
{
  declare readonly Parameters: Readonly<msdyn_DoesKBExistRequestParameters>;

  constructor(parameters: msdyn_DoesKBExistRequestParameters) {
    super("msdyn_DoesKBExist", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DoesKBExist`;

    const body = requestBody({
      HarvestWorkItemResponse: this.Parameters.HarvestWorkItemResponse,
      CSCopilotRequest: this.Parameters.CSCopilotRequest,
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

  async parseResponse(response: Response): Promise<msdyn_DoesKBExistResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_DoesKBExistResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_DoesKBExist action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DoesKBExistResult {
  "@odata.context"?: string;
  Response: string;
  usage: string;
}

/**
 * msdyn_DoesKBExist response message
 *
 * `result` is the value the msdyn_DoesKBExist action returns (see {@link msdyn_DoesKBExistResult}).
 */
export class msdyn_DoesKBExistResponse extends OrganizationResponse {
  constructor(public result: msdyn_DoesKBExistResult) {
    super("msdyn_DoesKBExist");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_DoesKBExistResponse {
    return new msdyn_DoesKBExistResponse(data as msdyn_DoesKBExistResult);
  }
}
