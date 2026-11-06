import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CallHangUp message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CallHangUpRequestParameters {
  ApiVersion: string;
  ConversationId: string;
}

/**
 * CallHangUp request message
 *
 * Web API Action: CallHangUp
 */
export class CallHangUpRequest
  extends OrganizationRequest
  implements Executable<CallHangUpResponse>
{
  declare readonly Parameters: Readonly<CallHangUpRequestParameters>;

  constructor(parameters: CallHangUpRequestParameters) {
    super("CallHangUp", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CallHangUp`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      ConversationId: this.Parameters.ConversationId,
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

  async parseResponse(response: Response): Promise<CallHangUpResponse> {
    // The body is the complex value, with its @odata.context
    return CallHangUpResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CallHangUp action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CallHangUpResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * CallHangUp response message
 *
 * `result` is the value the CallHangUp action returns (see {@link CallHangUpResult}).
 */
export class CallHangUpResponse extends OrganizationResponse {
  constructor(public result: CallHangUpResult) {
    super("CallHangUp");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CallHangUpResponse {
    return new CallHangUpResponse(data as CallHangUpResult);
  }
}
