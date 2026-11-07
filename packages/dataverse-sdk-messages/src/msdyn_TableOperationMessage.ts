import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TableOperation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TableOperationRequestParameters {
  Scenario: string;
  EntityNames?: string;
}

/**
 * msdyn_TableOperation request message
 *
 * Web API Action: msdyn_TableOperation
 */
export class msdyn_TableOperationRequest
  extends OrganizationRequest
  implements Executable<msdyn_TableOperationResponse>
{
  declare readonly Parameters: Readonly<msdyn_TableOperationRequestParameters>;

  constructor(parameters: msdyn_TableOperationRequestParameters) {
    super("msdyn_TableOperation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TableOperation`;

    const body = requestBody({
      Scenario: this.Parameters.Scenario,
      EntityNames: this.Parameters.EntityNames,
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

  async parseResponse(response: Response): Promise<msdyn_TableOperationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TableOperationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TableOperation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TableOperationResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_TableOperation response message
 *
 * `result` is the value the msdyn_TableOperation action returns (see {@link msdyn_TableOperationResult}).
 */
export class msdyn_TableOperationResponse extends OrganizationResponse {
  constructor(public result: msdyn_TableOperationResult) {
    super("msdyn_TableOperation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TableOperationResponse {
    return new msdyn_TableOperationResponse(data as msdyn_TableOperationResult);
  }
}
