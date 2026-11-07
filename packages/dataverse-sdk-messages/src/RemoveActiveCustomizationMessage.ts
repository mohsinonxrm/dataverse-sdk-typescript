import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the RemoveActiveCustomization message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveActiveCustomizationRequestParameters {
  LogicalName: string;
  Id: string;
}

/**
 * RemoveActiveCustomization request message
 *
 * Web API Action: RemoveActiveCustomization
 */
export class RemoveActiveCustomizationRequest
  extends OrganizationRequest
  implements Executable<RemoveActiveCustomizationResponse>
{
  declare readonly Parameters: Readonly<RemoveActiveCustomizationRequestParameters>;

  constructor(parameters: RemoveActiveCustomizationRequestParameters) {
    super("RemoveActiveCustomization", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveActiveCustomization`;

    const body = requestBody({
      LogicalName: this.Parameters.LogicalName,
      Id: this.Parameters.Id,
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

  async parseResponse(response: Response): Promise<RemoveActiveCustomizationResponse> {
    // The body is the complex value, with its @odata.context
    return RemoveActiveCustomizationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RemoveActiveCustomization action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RemoveActiveCustomizationResult {
  "@odata.context"?: string;
  Success: boolean;
}

/**
 * RemoveActiveCustomization response message
 *
 * `result` is the value the RemoveActiveCustomization action returns (see {@link RemoveActiveCustomizationResult}).
 */
export class RemoveActiveCustomizationResponse extends OrganizationResponse {
  constructor(public result: RemoveActiveCustomizationResult) {
    super("RemoveActiveCustomization");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RemoveActiveCustomizationResponse {
    return new RemoveActiveCustomizationResponse(data as RemoveActiveCustomizationResult);
  }
}
