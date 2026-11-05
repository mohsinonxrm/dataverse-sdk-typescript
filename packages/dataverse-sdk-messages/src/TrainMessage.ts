import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { TrainResponse as TrainResponseData } from "./types/index.js";

/**
 * Train request message
 *
 * Web API Action: Train
 */
export class TrainRequest extends OrganizationRequest implements Executable<TrainResponse> {
  constructor(
    public msdyn_aiconfigurationId: string,
    public version: string,
    public source: string
  ) {
    super("Train");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.Train`;

    const body: Record<string, unknown> = {
      version: this.version,
      source: this.source,
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

  async parseResponse(response: Response): Promise<TrainResponse> {
    const data = await response.json();
    return TrainResponse.fromResponse(data);
  }
}

/**
 * Train response message
 */
export class TrainResponse extends OrganizationResponse {
  constructor(public result: TrainResponseData) {
    super("Train");
  }

  static fromResponse(data: unknown): TrainResponse {
    return new TrainResponse(responseObject<TrainResponseData>(data));
  }
}
