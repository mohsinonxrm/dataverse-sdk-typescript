import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { list } from "./types/index.js";

/**
 * CopyDynamicListToStatic request message
 *
 * Web API Action: CopyDynamicListToStatic
 */
export class CopyDynamicListToStaticRequest
  extends OrganizationRequest
  implements Executable<CopyDynamicListToStaticResponse>
{
  constructor(public listId: string) {
    super("CopyDynamicListToStatic");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.CopyDynamicListToStatic`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CopyDynamicListToStaticResponse> {
    const data = await response.json();
    return CopyDynamicListToStaticResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.listId,
    };
  }
}

/**
 * CopyDynamicListToStatic response message
 */
export class CopyDynamicListToStaticResponse extends OrganizationResponse {
  constructor(public result: list) {
    super("CopyDynamicListToStatic");
  }

  static fromResponse(data: unknown): CopyDynamicListToStaticResponse {
    return new CopyDynamicListToStaticResponse((data as any).value);
  }
}
