import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_InvokeServiceStoredProcResponse as msdyn_InvokeServiceStoredProcResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_InvokeServiceStoredProcResponse> {
    const data = await response.json();
    return msdyn_InvokeServiceStoredProcResponse.fromResponse(data);
  }
}

/**
 * msdyn_InvokeServiceStoredProc response message
 */
export class msdyn_InvokeServiceStoredProcResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeServiceStoredProcResponseData) {
    super("msdyn_InvokeServiceStoredProc");
  }

  static fromResponse(data: unknown): msdyn_InvokeServiceStoredProcResponse {
    return new msdyn_InvokeServiceStoredProcResponse(
      responseObject<msdyn_InvokeServiceStoredProcResponseData>(data)
    );
  }
}
