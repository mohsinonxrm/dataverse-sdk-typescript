import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckIfRequiredLevelOfFieldIsChanged response message
 */
export class msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse) {
    super("msdyn_CheckIfRequiredLevelOfFieldIsChanged");
  }

  static fromResponse(data: unknown): msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse {
    return new msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse((data as any).value);
  }
}
