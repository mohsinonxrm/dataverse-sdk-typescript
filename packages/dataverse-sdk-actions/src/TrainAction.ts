import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from Train action
 */
export interface TrainResponse {
  response: string;
}

/**
 * Train action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 */
export class TrainAction implements Executable<TrainResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly version: string,
    public readonly source: string
  ) {}

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
    return data as TrainResponse;
  }
}
