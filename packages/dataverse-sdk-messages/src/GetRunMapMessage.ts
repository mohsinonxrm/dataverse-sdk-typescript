import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GetRunMap message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetRunMapRequestParameters {
  continuationToken?: string;
  runId: string;
  max?: number;
}

/**
 * GetRunMap request message
 *
 * Web API Action: GetRunMap
 *
 * The first argument is the id of the businessprocess record to call it on.
 */
export class GetRunMapRequest extends OrganizationRequest implements Executable<GetRunMapResponse> {
  declare readonly Parameters: Readonly<GetRunMapRequestParameters>;

  constructor(
    public businessprocessId: string,
    parameters: GetRunMapRequestParameters
  ) {
    super("GetRunMap", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/businessprocesses(${odataLiteral.guid(this.businessprocessId)})/Microsoft.Dynamics.CRM.GetRunMap`;

    const body = requestBody({
      continuationToken: this.Parameters.continuationToken,
      runId: this.Parameters.runId,
      max: this.Parameters.max,
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

  async parseResponse(response: Response): Promise<GetRunMapResponse> {
    // The body is the complex value, with its @odata.context
    return GetRunMapResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetRunMap action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetRunMapResult {
  "@odata.context"?: string;
  continuationToken: string;
  runMap: string;
}

/**
 * GetRunMap response message
 *
 * `result` is the value the GetRunMap action returns (see {@link GetRunMapResult}).
 */
export class GetRunMapResponse extends OrganizationResponse {
  constructor(public result: GetRunMapResult) {
    super("GetRunMap");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetRunMapResponse {
    return new GetRunMapResponse(data as GetRunMapResult);
  }
}
