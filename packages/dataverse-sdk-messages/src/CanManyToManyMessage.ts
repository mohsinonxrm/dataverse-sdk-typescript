import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CanManyToMany message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CanManyToManyRequestParameters {
  EntityName: string;
}

/**
 * CanManyToMany request message
 *
 * Web API Action: CanManyToMany
 */
export class CanManyToManyRequest
  extends OrganizationRequest
  implements Executable<CanManyToManyResponse>
{
  declare readonly Parameters: Readonly<CanManyToManyRequestParameters>;

  constructor(parameters: CanManyToManyRequestParameters) {
    super("CanManyToMany", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanManyToMany`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
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

  async parseResponse(response: Response): Promise<CanManyToManyResponse> {
    // The body is the complex value, with its @odata.context
    return CanManyToManyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CanManyToMany action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CanManyToManyResult {
  "@odata.context"?: string;
  CanManyToMany: boolean;
}

/**
 * CanManyToMany response message
 *
 * `result` is the value the CanManyToMany action returns (see {@link CanManyToManyResult}).
 */
export class CanManyToManyResponse extends OrganizationResponse {
  constructor(public result: CanManyToManyResult) {
    super("CanManyToMany");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CanManyToManyResponse {
    return new CanManyToManyResponse(data as CanManyToManyResult);
  }
}
