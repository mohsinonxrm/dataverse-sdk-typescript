import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse as msdyn_CheckIfRequiredLevelOfFieldIsChangedResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfRequiredLevelOfFieldIsChanged request message
 *
 * Web API Action: msdyn_CheckIfRequiredLevelOfFieldIsChanged
 */
export class msdyn_CheckIfRequiredLevelOfFieldIsChangedRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse>
{
  constructor() {
    super("msdyn_CheckIfRequiredLevelOfFieldIsChanged");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfRequiredLevelOfFieldIsChanged`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CheckIfRequiredLevelOfFieldIsChanged response message
 */
export class msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfRequiredLevelOfFieldIsChangedResponseData) {
    super("msdyn_CheckIfRequiredLevelOfFieldIsChanged");
  }

  static fromResponse(data: unknown): msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse {
    return new msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse(
      responseObject<msdyn_CheckIfRequiredLevelOfFieldIsChangedResponseData>(data)
    );
  }
}
