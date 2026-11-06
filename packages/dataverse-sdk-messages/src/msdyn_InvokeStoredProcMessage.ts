import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InvokeStoredProcResponse as msdyn_InvokeStoredProcResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_InvokeStoredProc message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeStoredProcRequestParameters {
  ProcId: number;
  BatchSize: number;
  BatchStart: number;
  AdminUserId: string;
  StringParam: string;
}

/**
 * msdyn_InvokeStoredProc request message
 *
 * Web API Action: msdyn_InvokeStoredProc
 */
export class msdyn_InvokeStoredProcRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeStoredProcResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeStoredProcRequestParameters>;

  constructor(parameters: msdyn_InvokeStoredProcRequestParameters) {
    super("msdyn_InvokeStoredProc", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeStoredProc`;

    const body = requestBody({
      ProcId: this.Parameters.ProcId,
      BatchSize: this.Parameters.BatchSize,
      BatchStart: this.Parameters.BatchStart,
      AdminUserId: this.Parameters.AdminUserId,
      StringParam: this.Parameters.StringParam,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeStoredProcResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_InvokeStoredProcResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_InvokeStoredProc response message
 */
export class msdyn_InvokeStoredProcResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeStoredProcResponseData) {
    super("msdyn_InvokeStoredProc");
  }

  static fromResponse(data: unknown): msdyn_InvokeStoredProcResponse {
    return new msdyn_InvokeStoredProcResponse(
      responseObject<msdyn_InvokeStoredProcResponseData>(data)
    );
  }
}
