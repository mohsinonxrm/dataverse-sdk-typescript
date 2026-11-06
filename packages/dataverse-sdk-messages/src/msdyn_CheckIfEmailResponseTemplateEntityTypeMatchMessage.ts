import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse as msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfEmailResponseTemplateEntityTypeMatch request message
 *
 * Web API Action: msdyn_CheckIfEmailResponseTemplateEntityTypeMatch
 */
export class msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckIfEmailResponseTemplateEntityTypeMatch");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfEmailResponseTemplateEntityTypeMatch`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
    };

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
    const data = await response.json();
    return msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse.fromResponse(data);
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
