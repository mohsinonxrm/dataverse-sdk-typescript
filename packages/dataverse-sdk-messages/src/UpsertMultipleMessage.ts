import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { UpsertMultipleResponse as UpsertMultipleResponseData } from "./types/index.js";

/**
 * Parameters of the UpsertMultiple message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpsertMultipleRequestParameters {
  Targets: Record<string, unknown>[];
}

/**
 * UpsertMultiple request message
 *
 * Web API Action: UpsertMultiple
 *
 * The first argument is the entity set to call it on, for example "accounts".
 */
export class UpsertMultipleRequest
  extends OrganizationRequest
  implements Executable<UpsertMultipleResponse>
{
  declare readonly Parameters: Readonly<UpsertMultipleRequestParameters>;

  constructor(
    public entitySetName: string,
    parameters: UpsertMultipleRequestParameters
  ) {
    super("UpsertMultiple", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.UpsertMultiple`;

    const body = requestBody({
      Targets: this.Parameters.Targets,
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

  async parseResponse(response: Response): Promise<UpsertMultipleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return UpsertMultipleResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * UpsertMultiple response message
 */
export class UpsertMultipleResponse extends OrganizationResponse {
  constructor(public result: UpsertMultipleResponseData) {
    super("UpsertMultiple");
  }

  static fromResponse(data: unknown): UpsertMultipleResponse {
    return new UpsertMultipleResponse(responseObject<UpsertMultipleResponseData>(data));
  }
}
