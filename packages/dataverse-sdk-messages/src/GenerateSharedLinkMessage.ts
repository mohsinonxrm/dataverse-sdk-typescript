import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AccessRights } from "./types/index.js";

/**
 * GenerateSharedLink request message
 *
 * Web API Action: GenerateSharedLink
 */
export class GenerateSharedLinkRequest
  extends OrganizationRequest
  implements Executable<GenerateSharedLinkResponse>
{
  constructor(
    public target: EntityReference,
    public sharedRights: AccessRights
  ) {
    super("GenerateSharedLink");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateSharedLink`;

    const body: Record<string, unknown> = {
      Target: this.target,
      SharedRights: this.sharedRights,
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

  async parseResponse(response: Response): Promise<GenerateSharedLinkResponse> {
    const data = await response.json();
    return GenerateSharedLinkResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      SharedRights: this.sharedRights,
    };
  }
}

/**
 * GenerateSharedLink response message
 */
export class GenerateSharedLinkResponse extends OrganizationResponse {
  constructor(public result: GenerateSharedLinkResponse) {
    super("GenerateSharedLink");
  }

  static fromResponse(data: unknown): GenerateSharedLinkResponse {
    return new GenerateSharedLinkResponse((data as any).value);
  }
}
