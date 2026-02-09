import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckForConditionXmlFormat request message
 *
 * Web API Action: msdyn_CheckForConditionXmlFormat
 */
export class msdyn_CheckForConditionXmlFormatRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForConditionXmlFormatResponse>
{
  constructor(public solutionId: string) {
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForConditionXmlFormatResponse> {
    const data = await response.json();
    return msdyn_CheckForConditionXmlFormatResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionId: this.solutionId,
    };
  }
}

/**
 * msdyn_CheckForConditionXmlFormat response message
 */
export class msdyn_CheckForConditionXmlFormatResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForConditionXmlFormatResponse) {
    super("msdyn_CheckForConditionXmlFormat");
  }

  static fromResponse(data: unknown): msdyn_CheckForConditionXmlFormatResponse {
    return new msdyn_CheckForConditionXmlFormatResponse((data as any).value);
  }
}
