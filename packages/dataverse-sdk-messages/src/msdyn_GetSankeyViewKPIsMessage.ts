import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSankeyViewKPIs message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSankeyViewKPIsRequestParameters {
  ActionIds: string;
  SequenceId: string;
  RegardingEntityName: string;
}

/**
 * msdyn_GetSankeyViewKPIs request message
 *
 * Web API Action: msdyn_GetSankeyViewKPIs
 */
export class msdyn_GetSankeyViewKPIsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSankeyViewKPIsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSankeyViewKPIsRequestParameters>;

  constructor(parameters: msdyn_GetSankeyViewKPIsRequestParameters) {
    super("msdyn_GetSankeyViewKPIs", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSankeyViewKPIs`;

    const body = requestBody({
      ActionIds: this.Parameters.ActionIds,
      SequenceId: this.Parameters.SequenceId,
      RegardingEntityName: this.Parameters.RegardingEntityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetSankeyViewKPIsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSankeyViewKPIsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSankeyViewKPIs action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSankeyViewKPIsResult {
  "@odata.context"?: string;
  SankeyViewKPIs: string;
}

/**
 * msdyn_GetSankeyViewKPIs response message
 *
 * `result` is the value the msdyn_GetSankeyViewKPIs action returns (see {@link msdyn_GetSankeyViewKPIsResult}).
 */
export class msdyn_GetSankeyViewKPIsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSankeyViewKPIsResult) {
    super("msdyn_GetSankeyViewKPIs");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSankeyViewKPIsResponse {
    return new msdyn_GetSankeyViewKPIsResponse(data as msdyn_GetSankeyViewKPIsResult);
  }
}
