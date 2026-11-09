import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CanBeReferenced message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CanBeReferencedRequestParameters {
  EntityName: string;
}

/**
 * CanBeReferenced request message
 *
 * Web API Action: CanBeReferenced
 */
export class CanBeReferencedRequest
  extends OrganizationRequest
  implements Executable<CanBeReferencedResponse>
{
  declare readonly Parameters: Readonly<CanBeReferencedRequestParameters>;

  constructor(parameters: CanBeReferencedRequestParameters) {
    super("CanBeReferenced", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanBeReferenced`;

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

  async parseResponse(response: Response): Promise<CanBeReferencedResponse> {
    // The body is the complex value, with its @odata.context
    return CanBeReferencedResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CanBeReferenced action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CanBeReferencedResult {
  "@odata.context"?: string;
  CanBeReferenced: boolean;
}

/**
 * CanBeReferenced response message
 *
 * `result` is the value the CanBeReferenced action returns (see {@link CanBeReferencedResult}).
 */
export class CanBeReferencedResponse extends OrganizationResponse {
  constructor(public result: CanBeReferencedResult) {
    super("CanBeReferenced");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CanBeReferencedResponse {
    return new CanBeReferencedResponse(data as CanBeReferencedResult);
  }
}
