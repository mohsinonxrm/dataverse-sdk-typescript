import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SetSharePointDocumentStatus request message
 *
 * Web API Action: msdyn_SetSharePointDocumentStatus
 */
export class msdyn_SetSharePointDocumentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetSharePointDocumentStatusResponse>
{
  constructor(
    public enable: boolean,
    public logicalEntityNames: string
  ) {
    super("msdyn_SetSharePointDocumentStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetSharePointDocumentStatus`;

    const body: Record<string, unknown> = {
      Enable: this.enable,
      LogicalEntityNames: this.logicalEntityNames,
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

  async parseResponse(response: Response): Promise<msdyn_SetSharePointDocumentStatusResponse> {
    const data = await response.json();
    return msdyn_SetSharePointDocumentStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Enable: this.enable,
      LogicalEntityNames: this.logicalEntityNames,
    };
  }
}

/**
 * msdyn_SetSharePointDocumentStatus response message
 */
export class msdyn_SetSharePointDocumentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SetSharePointDocumentStatusResponse) {
    super("msdyn_SetSharePointDocumentStatus");
  }

  static fromResponse(data: unknown): msdyn_SetSharePointDocumentStatusResponse {
    return new msdyn_SetSharePointDocumentStatusResponse((data as any).value);
  }
}
