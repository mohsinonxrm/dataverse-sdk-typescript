import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CreateMultipleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateMultiple action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateMultipleResult {
  "@odata.context"?: string;
  Ids: string[];
}

/**
 * CreateMultiple response message
 *
 * `result` is the value the CreateMultiple action returns (see {@link CreateMultipleResult}).
 */
export class CreateMultipleResponse extends OrganizationResponse {
  constructor(public result: CreateMultipleResult) {
    super("CreateMultiple");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateMultipleResponse {
    return new CreateMultipleResponse(data as CreateMultipleResult);
  }
}
