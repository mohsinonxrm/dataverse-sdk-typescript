import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForActiveLayersOnProcessesResponse as msdyn_CheckForActiveLayersOnProcessesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForActiveLayersOnProcesses message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForActiveLayersOnProcessesRequestParameters {
  SolutionId: string;
  ExcludeFormIds: string;
}

/**
 * msdyn_CheckForActiveLayersOnProcesses request message
 *
 * Web API Action: msdyn_CheckForActiveLayersOnProcesses
 */
export class msdyn_CheckForActiveLayersOnProcessesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForActiveLayersOnProcessesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForActiveLayersOnProcessesRequestParameters>;

  constructor(parameters: msdyn_CheckForActiveLayersOnProcessesRequestParameters) {
    super("msdyn_CheckForActiveLayersOnProcesses", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForActiveLayersOnProcesses`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
      ExcludeFormIds: this.Parameters.ExcludeFormIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForActiveLayersOnProcessesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckForActiveLayersOnProcessesResponse.fromResponse({});
    return msdyn_CheckForActiveLayersOnProcessesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckForActiveLayersOnProcesses response message
 */
export class msdyn_CheckForActiveLayersOnProcessesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForActiveLayersOnProcessesResponseData) {
    super("msdyn_CheckForActiveLayersOnProcesses");
  }

  static fromResponse(data: unknown): msdyn_CheckForActiveLayersOnProcessesResponse {
    return new msdyn_CheckForActiveLayersOnProcessesResponse(
      responseObject<msdyn_CheckForActiveLayersOnProcessesResponseData>(data)
    );
  }
}
