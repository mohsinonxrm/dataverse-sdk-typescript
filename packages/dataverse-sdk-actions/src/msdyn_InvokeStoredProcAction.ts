import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_InvokeStoredProc action
 */
export interface msdyn_InvokeStoredProcResponse {
  output: string;
}

/**
 * msdyn_InvokeStoredProc action
 *
 * Unbound action
 */
export class msdyn_InvokeStoredProcAction implements Executable<msdyn_InvokeStoredProcResponse> {
  constructor(
    public readonly procId: number,
    public readonly batchSize: number,
    public readonly batchStart: number,
    public readonly adminUserId: string,
    public readonly stringParam: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeStoredProc`;

    const body: Record<string, unknown> = {
      ProcId: this.procId,
      BatchSize: this.batchSize,
      BatchStart: this.batchStart,
      AdminUserId: this.adminUserId,
      StringParam: this.stringParam,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeStoredProcResponse> {
    const data = await response.json();
    return data as msdyn_InvokeStoredProcResponse;
  }
}
