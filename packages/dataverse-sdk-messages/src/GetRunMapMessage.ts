import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { GetRunMapResponse as GetRunMapResponseData } from "./types/index.js";

/**
 * GetRunMap request message
 *
 * Web API Action: GetRunMap
 */
export class GetRunMapRequest extends OrganizationRequest implements Executable<GetRunMapResponse> {
  constructor(
    public businessprocessId: string,
    public runId: string,
    public continuationToken?: string,
    public max?: number
  ) {
    super("GetRunMap");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/businessprocesses(${this.businessprocessId})/Microsoft.Dynamics.CRM.GetRunMap`;

    const body: Record<string, unknown> = {
      runId: this.runId,
      continuationToken: this.continuationToken,
      max: this.max,
    };

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
    const data = await response.json();
    return GetRunMapResponse.fromResponse(data);
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
