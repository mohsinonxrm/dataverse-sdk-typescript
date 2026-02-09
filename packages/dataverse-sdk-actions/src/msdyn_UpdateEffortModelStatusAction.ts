import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateEffortModelStatus action
 */
export interface msdyn_UpdateEffortModelStatusResponse {
  ErrorDetail: string;
}

/**
 * msdyn_UpdateEffortModelStatus action
 *
 * Unbound action
 */
export class msdyn_UpdateEffortModelStatusAction implements Executable<msdyn_UpdateEffortModelStatusResponse> {
  constructor(
    public readonly aiConfigId: string,
    public readonly effortModelId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateEffortModelStatus`;

    const body: Record<string, unknown> = {
      AiConfigId: this.aiConfigId,
      EffortModelId: this.effortModelId,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateEffortModelStatusResponse> {
    const data = await response.json();
    return data as msdyn_UpdateEffortModelStatusResponse;
  }
}
