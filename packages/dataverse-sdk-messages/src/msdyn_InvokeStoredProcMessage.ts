import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_InvokeStoredProc request message
 *
 * Web API Action: msdyn_InvokeStoredProc
 */
export class msdyn_InvokeStoredProcRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeStoredProcResponse>
{
  constructor(
    public procId: number,
    public batchSize: number,
    public batchStart: number,
    public adminUserId: string,
    public stringParam: string
  ) {
    super("msdyn_InvokeStoredProc");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_InvokeStoredProcResponse> {
    const data = await response.json();
    return msdyn_InvokeStoredProcResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ProcId: this.procId,
      BatchSize: this.batchSize,
      BatchStart: this.batchStart,
      AdminUserId: this.adminUserId,
      StringParam: this.stringParam,
    };
  }
}

/**
 * msdyn_InvokeStoredProc response message
 */
export class msdyn_InvokeStoredProcResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeStoredProcResponse) {
    super("msdyn_InvokeStoredProc");
  }

  static fromResponse(data: unknown): msdyn_InvokeStoredProcResponse {
    return new msdyn_InvokeStoredProcResponse((data as any).value);
  }
}
