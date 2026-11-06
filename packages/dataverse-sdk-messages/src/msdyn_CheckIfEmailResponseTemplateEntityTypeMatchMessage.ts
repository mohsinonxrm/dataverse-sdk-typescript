import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse as msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckIfEmailResponseTemplateEntityTypeMatch message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckIfEmailResponseTemplateEntityTypeMatch request message
 *
 * Web API Action: msdyn_CheckIfEmailResponseTemplateEntityTypeMatch
 */
export class msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequestParameters>;

  constructor(parameters: msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequestParameters = {}) {
    super("msdyn_CheckIfEmailResponseTemplateEntityTypeMatch", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfEmailResponseTemplateEntityTypeMatch`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CheckIfEmailResponseTemplateEntityTypeMatch response message
 */
export class msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponseData) {
    super("msdyn_CheckIfEmailResponseTemplateEntityTypeMatch");
  }

  static fromResponse(data: unknown): msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse {
    return new msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse(
      responseObject<msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponseData>(data)
    );
  }
}
