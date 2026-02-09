import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfWorkstreamHasDeletedSessionTemplates request message
 *
 * Web API Action: msdyn_CheckIfWorkstreamHasDeletedSessionTemplates
 */
export class msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse>
{
  constructor() {
    super("msdyn_CheckIfWorkstreamHasDeletedSessionTemplates");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfWorkstreamHasDeletedSessionTemplates`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse> {
    const data = await response.json();
    return msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckIfWorkstreamHasDeletedSessionTemplates response message
 */
export class msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse) {
    super("msdyn_CheckIfWorkstreamHasDeletedSessionTemplates");
  }

  static fromResponse(data: unknown): msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse {
    return new msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse((data as any).value);
  }
}
