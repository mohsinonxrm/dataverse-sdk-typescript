import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForCustomizedAppModuleResponse as msdyn_CheckForCustomizedAppModuleResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForCustomizedAppModule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForCustomizedAppModuleRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForCustomizedAppModule request message
 *
 * Web API Action: msdyn_CheckForCustomizedAppModule
 */
export class msdyn_CheckForCustomizedAppModuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForCustomizedAppModuleResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForCustomizedAppModuleRequestParameters>;

  constructor(parameters: msdyn_CheckForCustomizedAppModuleRequestParameters = {}) {
    super("msdyn_CheckForCustomizedAppModule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedAppModule`;

    const body = requestBody({
      EntityIds: this.Parameters.EntityIds,
      SolutionId: this.Parameters.SolutionId,
      ExcludeSolutionIds: this.Parameters.ExcludeSolutionIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedAppModuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckForCustomizedAppModuleResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CheckForCustomizedAppModule response message
 */
export class msdyn_CheckForCustomizedAppModuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForCustomizedAppModuleResponseData) {
    super("msdyn_CheckForCustomizedAppModule");
  }

  static fromResponse(data: unknown): msdyn_CheckForCustomizedAppModuleResponse {
    return new msdyn_CheckForCustomizedAppModuleResponse(
      responseObject<msdyn_CheckForCustomizedAppModuleResponseData>(data)
    );
  }
}
