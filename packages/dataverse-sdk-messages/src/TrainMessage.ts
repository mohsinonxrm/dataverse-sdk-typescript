import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<TrainResponse> {
    const data = await response.json();
    return TrainResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_aiconfigurationId,
      version: this.version,
      source: this.source,
    };
  }
}

/**
 * Train response message
 */
export class TrainResponse extends OrganizationResponse {
  constructor(public result: TrainResponse) {
    super("Train");
  }

  static fromResponse(data: unknown): TrainResponse {
    return new TrainResponse((data as any).value);
  }
}
