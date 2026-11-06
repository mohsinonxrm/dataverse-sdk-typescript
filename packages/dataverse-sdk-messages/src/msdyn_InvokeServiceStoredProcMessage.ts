import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InvokeServiceStoredProcResponse as msdyn_InvokeServiceStoredProcResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_InvokeServiceStoredProc message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeServiceStoredProcRequestParameters {
  ProcId: number;
  BatchSize: number;
  BatchStart: number;
}

/**
 * msdyn_InvokeServiceStoredProc request message
 *
 * Web API Action: msdyn_InvokeServiceStoredProc
 */
export class msdyn_InvokeServiceStoredProcRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeServiceStoredProcResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeServiceStoredProcRequestParameters>;

  constructor(parameters: msdyn_InvokeServiceStoredProcRequestParameters) {
    super("msdyn_InvokeServiceStoredProc", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeServiceStoredProc`;

    const body = requestBody({
      ProcId: this.Parameters.ProcId,
      BatchSize: this.Parameters.BatchSize,
      BatchStart: this.Parameters.BatchStart,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_InvokeServiceStoredProcResponse.fromResponse({});
    return msdyn_InvokeServiceStoredProcResponse.fromResponse(await response.json());
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
