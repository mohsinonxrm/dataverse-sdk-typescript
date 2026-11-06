import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForConditionXmlFormatResponse as msdyn_CheckForConditionXmlFormatResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForConditionXmlFormat message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForConditionXmlFormatRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckForConditionXmlFormat request message
 *
 * Web API Action: msdyn_CheckForConditionXmlFormat
 */
export class msdyn_CheckForConditionXmlFormatRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForConditionXmlFormatResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForConditionXmlFormatRequestParameters>;

  constructor(parameters: msdyn_CheckForConditionXmlFormatRequestParameters = {}) {
    super("msdyn_CheckForConditionXmlFormat", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForConditionXmlFormat`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForConditionXmlFormatResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckForConditionXmlFormatResponse.fromResponse(text ? JSON.parse(text) : {});
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
