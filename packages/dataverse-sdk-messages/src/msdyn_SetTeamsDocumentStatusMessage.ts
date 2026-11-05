import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SetTeamsDocumentStatus request message
 *
 * Web API Action: msdyn_SetTeamsDocumentStatus
 */
export class msdyn_SetTeamsDocumentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetTeamsDocumentStatusResponse>
{
  constructor(
    public enable: boolean,
    public logicalEntityNames: string
  ) {
    super("msdyn_SetTeamsDocumentStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetTeamsDocumentStatus`;

    const body: Record<string, unknown> = {
      Enable: this.enable,
      LogicalEntityNames: this.logicalEntityNames,
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

  async parseResponse(response: Response): Promise<msdyn_SetTeamsDocumentStatusResponse> {
    const data = await response.json();
    return msdyn_SetTeamsDocumentStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Enable: this.enable,
      LogicalEntityNames: this.logicalEntityNames,
    };
  }
}

/**
 * msdyn_SetTeamsDocumentStatus response message
 */
export class msdyn_SetTeamsDocumentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SetTeamsDocumentStatusResponse) {
    super("msdyn_SetTeamsDocumentStatus");
  }

  static fromResponse(data: unknown): msdyn_SetTeamsDocumentStatusResponse {
    return new msdyn_SetTeamsDocumentStatusResponse((data as any).value);
  }
}
