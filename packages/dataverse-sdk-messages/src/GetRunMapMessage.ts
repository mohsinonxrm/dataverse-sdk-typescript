import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { GetRunMapResponse as GetRunMapResponseData } from "./types/index.js";

/**
 * Parameters of the GetRunMap message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetRunMapRequestParameters {
  runId: string;
  continuationToken?: string;
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
    const url = `${baseUrl}/businessprocesses(${this.businessprocessId})/Microsoft.Dynamics.CRM.GetRunMap`;

    const body = requestBody({
      runId: this.Parameters.runId,
      continuationToken: this.Parameters.continuationToken,
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
    // 204 No Content is an empty result
    if (response.status === 204) return GetRunMapResponse.fromResponse({});
    return GetRunMapResponse.fromResponse(await response.json());
  }
}

/**
 * GetRunMap response message
 */
export class GetRunMapResponse extends OrganizationResponse {
  constructor(public result: GetRunMapResponseData) {
    super("GetRunMap");
  }

  static fromResponse(data: unknown): GetRunMapResponse {
    return new GetRunMapResponse(responseObject<GetRunMapResponseData>(data));
  }
}
