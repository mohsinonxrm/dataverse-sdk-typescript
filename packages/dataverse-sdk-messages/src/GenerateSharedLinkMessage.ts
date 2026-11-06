import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type {
  AccessRights,
  GenerateSharedLinkResponse as GenerateSharedLinkResponseData,
} from "./types/index.js";

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
    public target: EntityReference | AnyEntityPayload,
    public sharedRights: AccessRights
  ) {
    super("GenerateSharedLink");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateSharedLink`;

    const body: Record<string, unknown> = {
      Target: this.target,
      SharedRights: enumBody(this.sharedRights, "AccessRights"),
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
}

/**
 * GenerateSharedLink response message
 */
export class GenerateSharedLinkResponse extends OrganizationResponse {
  constructor(public result: GenerateSharedLinkResponseData) {
    super("GenerateSharedLink");
  }

  static fromResponse(data: unknown): GenerateSharedLinkResponse {
    return new GenerateSharedLinkResponse(responseObject<GenerateSharedLinkResponseData>(data));
  }
}
