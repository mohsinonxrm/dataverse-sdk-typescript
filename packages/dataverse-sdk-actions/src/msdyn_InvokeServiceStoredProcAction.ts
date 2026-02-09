import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_InvokeServiceStoredProc action
 */
export interface msdyn_InvokeServiceStoredProcResponse {
  output: string;
}

/**
 * msdyn_InvokeServiceStoredProc action
 *
 * Unbound action
 */
export class msdyn_InvokeServiceStoredProcAction implements Executable<msdyn_InvokeServiceStoredProcResponse> {
  constructor(
    public readonly procId: number,
    public readonly batchSize: number,
    public readonly batchStart: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeServiceStoredProc`;

    const body: Record<string, unknown> = {
      ProcId: this.procId,
      BatchSize: this.batchSize,
      BatchStart: this.batchStart,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeServiceStoredProcResponse> {
    const data = await response.json();
    return data as msdyn_InvokeServiceStoredProcResponse;
  }
}
