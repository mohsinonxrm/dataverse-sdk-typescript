import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RetrieveEmailNBA message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveEmailNBARequestParameters {
  msdyn_RegardingLogicalName: string;
  msdyn_RegardingEntityIds: string;
}

/**
 * msdyn_RetrieveEmailNBA request message
 *
 * Web API Action: msdyn_RetrieveEmailNBA
 */
export class msdyn_RetrieveEmailNBARequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveEmailNBAResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveEmailNBARequestParameters>;

  constructor(parameters: msdyn_RetrieveEmailNBARequestParameters) {
    super("msdyn_RetrieveEmailNBA", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEmailNBA`;

    const body = requestBody({
      msdyn_RegardingLogicalName: this.Parameters.msdyn_RegardingLogicalName,
      msdyn_RegardingEntityIds: this.Parameters.msdyn_RegardingEntityIds,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveEmailNBAResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveEmailNBAResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveEmailNBA action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveEmailNBAResult {
  "@odata.context"?: string;
  msdyn_result: string;
}

/**
 * msdyn_RetrieveEmailNBA response message
 *
 * `result` is the value the msdyn_RetrieveEmailNBA action returns (see {@link msdyn_RetrieveEmailNBAResult}).
 */
export class msdyn_RetrieveEmailNBAResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveEmailNBAResult) {
    super("msdyn_RetrieveEmailNBA");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveEmailNBAResponse {
    return new msdyn_RetrieveEmailNBAResponse(data as msdyn_RetrieveEmailNBAResult);
  }
}
