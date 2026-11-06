import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForConditionXmlFormatResponse as msdyn_CheckForConditionXmlFormatResponseData } from "./types/index.js";

/**
 * msdyn_CheckForConditionXmlFormat request message
 *
 * Web API Action: msdyn_CheckForConditionXmlFormat
 */
export class msdyn_CheckForConditionXmlFormatRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForConditionXmlFormatResponse>
{
  constructor(public solutionId?: string) {
    super("msdyn_CheckForConditionXmlFormat");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForConditionXmlFormat`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForConditionXmlFormatResponse> {
    const data = await response.json();
    return msdyn_CheckForConditionXmlFormatResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckForConditionXmlFormat response message
 */
export class msdyn_CheckForConditionXmlFormatResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForConditionXmlFormatResponseData) {
    super("msdyn_CheckForConditionXmlFormat");
  }

  static fromResponse(data: unknown): msdyn_CheckForConditionXmlFormatResponse {
    return new msdyn_CheckForConditionXmlFormatResponse(
      responseObject<msdyn_CheckForConditionXmlFormatResponseData>(data)
    );
  }
}
