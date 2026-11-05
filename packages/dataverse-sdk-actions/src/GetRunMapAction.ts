import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetRunMap action
 */
export interface GetRunMapResponse {
  continuationToken: string;
  runMap: string;
}

/**
 * GetRunMap action
 *
 * Bound action
 * Binding parameter: entity (mscrm.businessprocess)
 */
export class GetRunMapAction implements Executable<GetRunMapResponse> {
  constructor(
    public readonly businessprocessId: string,
    public readonly runId: string,
    public readonly continuationToken: string,
    public readonly max: number
  ) {}

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
    return data as GetRunMapResponse;
  }
}
