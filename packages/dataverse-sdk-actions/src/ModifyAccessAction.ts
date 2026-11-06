import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { PrincipalAccess } from "./types/index.js";

/**
 * Response from ModifyAccess action
 */
export interface ModifyAccessResponse {
  // No content returned
}

/**
 * Parameters of the ModifyAccess action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ModifyAccessActionParameters {
  Target: EntityReference | AnyEntityPayload;
  PrincipalAccess?: PrincipalAccess;
}

/**
 * ModifyAccess action
 *
 * Unbound action
 */
export class ModifyAccessAction implements Executable<ModifyAccessResponse> {
  constructor(public readonly parameters: ModifyAccessActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ModifyAccess`;

    const body = requestBody({
      Target: this.parameters.Target,
      PrincipalAccess: enumBody(this.parameters.PrincipalAccess, "PrincipalAccess"),
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

  async parseResponse(response: Response): Promise<ModifyAccessResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ModifyAccessResponse;
    return (await response.json()) as ModifyAccessResponse;
  }
}
