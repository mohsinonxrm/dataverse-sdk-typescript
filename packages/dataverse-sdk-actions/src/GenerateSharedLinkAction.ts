import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { AccessRights } from "./types/index.js";

/**
 * Response from GenerateSharedLink action
 */
export interface GenerateSharedLinkResponse {
  Response: string;
}

/**
 * Parameters of the GenerateSharedLink action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateSharedLinkActionParameters {
  Target: EntityReference | AnyEntityPayload;
  SharedRights: AccessRights;
}

/**
 * GenerateSharedLink action
 *
 * Unbound action
 */
export class GenerateSharedLinkAction implements Executable<GenerateSharedLinkResponse> {
  constructor(public readonly parameters: GenerateSharedLinkActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateSharedLink`;

    const body = requestBody({
      Target: this.parameters.Target,
      SharedRights: enumBody(this.parameters.SharedRights, "AccessRights"),
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
    if (response.status === 204) return {} as GenerateSharedLinkResponse;
    return (await response.json()) as GenerateSharedLinkResponse;
  }
}
