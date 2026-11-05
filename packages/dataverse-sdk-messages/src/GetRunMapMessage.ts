import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetRunMap request message
 *
 * Web API Action: GetRunMap
 */
export class GetRunMapRequest extends OrganizationRequest implements Executable<GetRunMapResponse> {
  constructor(
    public businessprocessId: string,
    public runId: string,
    public continuationToken: string,
    public max: number
  ) {
    super("GetRunMap");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/businessprocesss(${this.businessprocessId})/Microsoft.Dynamics.CRM.GetRunMap`;

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

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.businessprocessId,
      runId: this.runId,
      continuationToken: this.continuationToken,
      max: this.max,
    };
  }
}

/**
 * GetRunMap response message
 */
export class GetRunMapResponse extends OrganizationResponse {
  constructor(public result: GetRunMapResponse) {
    super("GetRunMap");
  }

  static fromResponse(data: unknown): GetRunMapResponse {
    return new GetRunMapResponse((data as any).value);
  }
}
