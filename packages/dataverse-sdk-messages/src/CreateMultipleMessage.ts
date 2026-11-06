import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CreateMultipleResponse as CreateMultipleResponseData } from "./types/index.js";

/**
 * Parameters of the CreateMultiple message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateMultipleRequestParameters {
  Targets: Record<string, unknown>[];
}

/**
 * CreateMultiple request message
 *
 * Web API Action: CreateMultiple
 *
 * The first argument is the entity set to call it on, for example "accounts".
 */
export class CreateMultipleRequest
  extends OrganizationRequest
  implements Executable<CreateMultipleResponse>
{
  declare readonly Parameters: Readonly<CreateMultipleRequestParameters>;

  constructor(
    public entitySetName: string,
    parameters: CreateMultipleRequestParameters
  ) {
    super("CreateMultiple", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.CreateMultiple`;

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

  async parseResponse(response: Response): Promise<CreateMultipleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CreateMultipleResponse.fromResponse({});
    return CreateMultipleResponse.fromResponse(await response.json());
  }
}

/**
 * CreateMultiple response message
 */
export class CreateMultipleResponse extends OrganizationResponse {
  constructor(public result: CreateMultipleResponseData) {
    super("CreateMultiple");
  }

  static fromResponse(data: unknown): CreateMultipleResponse {
    return new CreateMultipleResponse(responseObject<CreateMultipleResponseData>(data));
  }
}
