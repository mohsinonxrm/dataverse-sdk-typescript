import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AlmHandler message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AlmHandlerRequestParameters {
  action: string;
  input?: string;
}

/**
 * AlmHandler request message
 *
 * Web API Action: AlmHandler
 */
export class AlmHandlerRequest
  extends OrganizationRequest
  implements Executable<AlmHandlerResponse>
{
  declare readonly Parameters: Readonly<AlmHandlerRequestParameters>;

  constructor(parameters: AlmHandlerRequestParameters) {
    super("AlmHandler", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AlmHandler`;

    const body = requestBody({
      action: this.Parameters.action,
      input: this.Parameters.input,
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

  async parseResponse(response: Response): Promise<AlmHandlerResponse> {
    // The body is the complex value, with its @odata.context
    return AlmHandlerResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AlmHandler action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AlmHandlerResult {
  "@odata.context"?: string;
  result: string;
}

/**
 * AlmHandler response message
 *
 * `result` is the value the AlmHandler action returns (see {@link AlmHandlerResult}).
 */
export class AlmHandlerResponse extends OrganizationResponse {
  constructor(public result: AlmHandlerResult) {
    super("AlmHandler");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AlmHandlerResponse {
    return new AlmHandlerResponse(data as AlmHandlerResult);
  }
}
