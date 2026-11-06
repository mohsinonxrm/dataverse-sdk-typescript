import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_PowerAutomateLogger message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PowerAutomateLoggerRequestParameters {
  LogMessage: string;
  LogType: string;
}

/**
 * msdyn_PowerAutomateLogger request message
 *
 * Web API Action: msdyn_PowerAutomateLogger
 */
export class msdyn_PowerAutomateLoggerRequest
  extends OrganizationRequest
  implements Executable<msdyn_PowerAutomateLoggerResponse>
{
  declare readonly Parameters: Readonly<msdyn_PowerAutomateLoggerRequestParameters>;

  constructor(parameters: msdyn_PowerAutomateLoggerRequestParameters) {
    super("msdyn_PowerAutomateLogger", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PowerAutomateLogger`;

    const body = requestBody({
      LogMessage: this.Parameters.LogMessage,
      LogType: this.Parameters.LogType,
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

  async parseResponse(response: Response): Promise<msdyn_PowerAutomateLoggerResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_PowerAutomateLoggerResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_PowerAutomateLogger action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_PowerAutomateLoggerResult {
  "@odata.context"?: string;
  Success: boolean;
}

/**
 * msdyn_PowerAutomateLogger response message
 *
 * `result` is the value the msdyn_PowerAutomateLogger action returns (see {@link msdyn_PowerAutomateLoggerResult}).
 */
export class msdyn_PowerAutomateLoggerResponse extends OrganizationResponse {
  constructor(public result: msdyn_PowerAutomateLoggerResult) {
    super("msdyn_PowerAutomateLogger");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_PowerAutomateLoggerResponse {
    return new msdyn_PowerAutomateLoggerResponse(data as msdyn_PowerAutomateLoggerResult);
  }
}
