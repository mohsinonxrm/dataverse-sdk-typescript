import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { RestoreResponse as RestoreResponseData } from "./types/index.js";

/**
 * Parameters of the Restore message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RestoreRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * Restore request message
 *
 * Web API Action: Restore
 */
export class RestoreRequest extends OrganizationRequest implements Executable<RestoreResponse> {
  declare readonly Parameters: Readonly<RestoreRequestParameters>;

  constructor(parameters: RestoreRequestParameters) {
    super("Restore", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Restore`;

    const body = requestBody({
      Target: this.Parameters.Target,
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

  async parseResponse(response: Response): Promise<RestoreResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return RestoreResponse.fromResponse({});
    return RestoreResponse.fromResponse(await response.json());
  }
}

/**
 * Restore response message
 */
export class RestoreResponse extends OrganizationResponse {
  constructor(public result: RestoreResponseData) {
    super("Restore");
  }

  static fromResponse(data: unknown): RestoreResponse {
    return new RestoreResponse(responseObject<RestoreResponseData>(data));
  }
}
