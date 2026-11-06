import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CanBeReferencing message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CanBeReferencingRequestParameters {
  EntityName: string;
}

/**
 * CanBeReferencing request message
 *
 * Web API Action: CanBeReferencing
 */
export class CanBeReferencingRequest
  extends OrganizationRequest
  implements Executable<CanBeReferencingResponse>
{
  declare readonly Parameters: Readonly<CanBeReferencingRequestParameters>;

  constructor(parameters: CanBeReferencingRequestParameters) {
    super("CanBeReferencing", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanBeReferencing`;

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

  async parseResponse(response: Response): Promise<CanBeReferencingResponse> {
    // The body is the complex value, with its @odata.context
    return CanBeReferencingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CanBeReferencing action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CanBeReferencingResult {
  "@odata.context"?: string;
  CanBeReferencing: boolean;
}

/**
 * CanBeReferencing response message
 *
 * `result` is the value the CanBeReferencing action returns (see {@link CanBeReferencingResult}).
 */
export class CanBeReferencingResponse extends OrganizationResponse {
  constructor(public result: CanBeReferencingResult) {
    super("CanBeReferencing");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CanBeReferencingResponse {
    return new CanBeReferencingResponse(data as CanBeReferencingResult);
  }
}
