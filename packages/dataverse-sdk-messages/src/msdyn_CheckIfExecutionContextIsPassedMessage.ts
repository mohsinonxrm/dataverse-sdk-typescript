import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckIfExecutionContextIsPassedResponse as msdyn_CheckIfExecutionContextIsPassedResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckIfExecutionContextIsPassed message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfExecutionContextIsPassedRequestParameters {
  SolutionId: string;
  ExcludeFormIds: string;
}

/**
 * msdyn_CheckIfExecutionContextIsPassed request message
 *
 * Web API Action: msdyn_CheckIfExecutionContextIsPassed
 */
export class msdyn_CheckIfExecutionContextIsPassedRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfExecutionContextIsPassedResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfExecutionContextIsPassedRequestParameters>;

  constructor(parameters: msdyn_CheckIfExecutionContextIsPassedRequestParameters) {
    super("msdyn_CheckIfExecutionContextIsPassed", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfExecutionContextIsPassed`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckIfExecutionContextIsPassedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckIfExecutionContextIsPassedResponse.fromResponse({});
    return msdyn_CheckIfExecutionContextIsPassedResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckIfExecutionContextIsPassed response message
 */
export class msdyn_CheckIfExecutionContextIsPassedResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfExecutionContextIsPassedResponseData) {
    super("msdyn_CheckIfExecutionContextIsPassed");
  }

  static fromResponse(data: unknown): msdyn_CheckIfExecutionContextIsPassedResponse {
    return new msdyn_CheckIfExecutionContextIsPassedResponse(
      responseObject<msdyn_CheckIfExecutionContextIsPassedResponseData>(data)
    );
  }
}
