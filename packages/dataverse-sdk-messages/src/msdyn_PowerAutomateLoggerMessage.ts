import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_PowerAutomateLogger request message
 *
 * Web API Action: msdyn_PowerAutomateLogger
 */
export class msdyn_PowerAutomateLoggerRequest
  extends OrganizationRequest
  implements Executable<msdyn_PowerAutomateLoggerResponse>
{
  constructor(
    public logType: string,
    public logMessage: string
  ) {
    super("msdyn_PowerAutomateLogger");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PowerAutomateLogger`;

    const body: Record<string, unknown> = {
      LogType: this.logType,
      LogMessage: this.logMessage,
    };

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
    const data = await response.json();
    return msdyn_PowerAutomateLoggerResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      LogType: this.logType,
      LogMessage: this.logMessage,
    };
  }
}

/**
 * msdyn_PowerAutomateLogger response message
 */
export class msdyn_PowerAutomateLoggerResponse extends OrganizationResponse {
  constructor(public result: msdyn_PowerAutomateLoggerResponse) {
    super("msdyn_PowerAutomateLogger");
  }

  static fromResponse(data: unknown): msdyn_PowerAutomateLoggerResponse {
    return new msdyn_PowerAutomateLoggerResponse((data as any).value);
  }
}
