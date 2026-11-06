import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForPendingProcessesResponse as msdyn_CheckForPendingProcessesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForPendingProcesses message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForPendingProcessesRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckForPendingProcesses request message
 *
 * Web API Action: msdyn_CheckForPendingProcesses
 */
export class msdyn_CheckForPendingProcessesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForPendingProcessesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForPendingProcessesRequestParameters>;

  constructor(parameters: msdyn_CheckForPendingProcessesRequestParameters = {}) {
    super("msdyn_CheckForPendingProcesses", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForPendingProcesses`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForPendingProcessesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckForPendingProcessesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CheckForPendingProcesses response message
 */
export class msdyn_CheckForPendingProcessesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForPendingProcessesResponseData) {
    super("msdyn_CheckForPendingProcesses");
  }

  static fromResponse(data: unknown): msdyn_CheckForPendingProcessesResponse {
    return new msdyn_CheckForPendingProcessesResponse(
      responseObject<msdyn_CheckForPendingProcessesResponseData>(data)
    );
  }
}
