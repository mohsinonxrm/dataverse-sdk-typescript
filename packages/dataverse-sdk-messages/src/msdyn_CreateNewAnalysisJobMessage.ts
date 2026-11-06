import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_analysisjob } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateNewAnalysisJob message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateNewAnalysisJobRequestParameters {
  ComponentInstances?: Record<string, unknown>[];
}

/**
 * msdyn_CreateNewAnalysisJob request message
 *
 * Web API Action: msdyn_CreateNewAnalysisJob
 */
export class msdyn_CreateNewAnalysisJobRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateNewAnalysisJobResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateNewAnalysisJobRequestParameters>;

  constructor(parameters: msdyn_CreateNewAnalysisJobRequestParameters = {}) {
    super("msdyn_CreateNewAnalysisJob", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateNewAnalysisJob`;

    const body = requestBody({
      ComponentInstances: this.Parameters.ComponentInstances,
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

  async parseResponse(response: Response): Promise<msdyn_CreateNewAnalysisJobResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreateNewAnalysisJobResponse.fromResponse({});
    return msdyn_CreateNewAnalysisJobResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateNewAnalysisJob response message
 */
export class msdyn_CreateNewAnalysisJobResponse extends OrganizationResponse {
  constructor(public result: msdyn_analysisjob) {
    super("msdyn_CreateNewAnalysisJob");
  }

  static fromResponse(data: unknown): msdyn_CreateNewAnalysisJobResponse {
    return new msdyn_CreateNewAnalysisJobResponse(responseObject<msdyn_analysisjob>(data));
  }
}
