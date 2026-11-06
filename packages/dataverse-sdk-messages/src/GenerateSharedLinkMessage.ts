import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type {
  AccessRights,
  GenerateSharedLinkResponse as GenerateSharedLinkResponseData,
} from "./types/index.js";

/**
 * Parameters of the GenerateSharedLink message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateSharedLinkRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  SharedRights: AccessRights;
}

/**
 * GenerateSharedLink request message
 *
 * Web API Action: GenerateSharedLink
 */
export class GenerateSharedLinkRequest
  extends OrganizationRequest
  implements Executable<GenerateSharedLinkResponse>
{
  declare readonly Parameters: Readonly<GenerateSharedLinkRequestParameters>;

  constructor(parameters: GenerateSharedLinkRequestParameters) {
    super("GenerateSharedLink", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateSharedLink`;

    const body = requestBody({
      Target: this.Parameters.Target,
      SharedRights: enumBody(this.Parameters.SharedRights, "AccessRights"),
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

  async parseResponse(response: Response): Promise<GenerateSharedLinkResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return GenerateSharedLinkResponse.fromResponse({});
    return GenerateSharedLinkResponse.fromResponse(await response.json());
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
