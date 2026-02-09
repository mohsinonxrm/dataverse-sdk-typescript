import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_InvokeServiceStoredProc request message
 *
 * Web API Action: msdyn_InvokeServiceStoredProc
 */
export class msdyn_InvokeServiceStoredProcRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeServiceStoredProcResponse>
{
  constructor(
    public procId: number,
    public batchSize: number,
    public batchStart: number
  ) {
    super("msdyn_InvokeServiceStoredProc");
  }

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
    return msdyn_InvokeServiceStoredProcResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ProcId: this.procId,
      BatchSize: this.batchSize,
      BatchStart: this.batchStart,
    };
  }
}

/**
 * msdyn_InvokeServiceStoredProc response message
 */
export class msdyn_InvokeServiceStoredProcResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeServiceStoredProcResponse) {
    super("msdyn_InvokeServiceStoredProc");
  }

  static fromResponse(data: unknown): msdyn_InvokeServiceStoredProcResponse {
    return new msdyn_InvokeServiceStoredProcResponse((data as any).value);
  }
}
