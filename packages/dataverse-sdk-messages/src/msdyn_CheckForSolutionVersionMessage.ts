import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckForSolutionVersion request message
 *
 * Web API Action: msdyn_CheckForSolutionVersion
 */
export class msdyn_CheckForSolutionVersionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForSolutionVersionResponse>
{
  constructor() {
    super("msdyn_CheckForSolutionVersion");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForSolutionVersion`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForSolutionVersionResponse> {
    const data = await response.json();
    return msdyn_CheckForSolutionVersionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckForSolutionVersion response message
 */
export class msdyn_CheckForSolutionVersionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForSolutionVersionResponse) {
    super("msdyn_CheckForSolutionVersion");
  }

  static fromResponse(data: unknown): msdyn_CheckForSolutionVersionResponse {
    return new msdyn_CheckForSolutionVersionResponse((data as any).value);
  }
}
