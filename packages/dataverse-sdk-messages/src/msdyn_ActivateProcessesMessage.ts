import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ActivateProcessesResponse as msdyn_ActivateProcessesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ActivateProcesses message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActivateProcessesRequestParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ActivateProcesses request message
 *
 * Web API Action: msdyn_ActivateProcesses
 */
export class msdyn_ActivateProcessesRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActivateProcessesResponse>
{
  declare readonly Parameters: Readonly<msdyn_ActivateProcessesRequestParameters>;

  constructor(parameters: msdyn_ActivateProcessesRequestParameters = {}) {
    super("msdyn_ActivateProcesses", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateProcesses`;

    const body = requestBody({
      AnalysisResult: this.Parameters.AnalysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_ActivateProcessesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ActivateProcessesResponse.fromResponse({});
    return msdyn_ActivateProcessesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ActivateProcesses response message
 */
export class msdyn_ActivateProcessesResponse extends OrganizationResponse {
  constructor(public result: msdyn_ActivateProcessesResponseData) {
    super("msdyn_ActivateProcesses");
  }

  static fromResponse(data: unknown): msdyn_ActivateProcessesResponse {
    return new msdyn_ActivateProcessesResponse(
      responseObject<msdyn_ActivateProcessesResponseData>(data)
    );
  }
}
