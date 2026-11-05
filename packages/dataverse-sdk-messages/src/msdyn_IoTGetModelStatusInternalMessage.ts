import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IoTGetModelStatusInternal request message
 *
 * Web API Action: msdyn_IoTGetModelStatusInternal
 */
export class msdyn_IoTGetModelStatusInternalRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTGetModelStatusInternalResponse>
{
  constructor(public scenarioId: string) {
    super("msdyn_IoTGetModelStatusInternal");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetModelStatusInternal`;

    const body: Record<string, unknown> = {
      ScenarioId: this.scenarioId,
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

  async parseResponse(response: Response): Promise<msdyn_IoTGetModelStatusInternalResponse> {
    const data = await response.json();
    return msdyn_IoTGetModelStatusInternalResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ScenarioId: this.scenarioId,
    };
  }
}

/**
 * msdyn_IoTGetModelStatusInternal response message
 */
export class msdyn_IoTGetModelStatusInternalResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetModelStatusInternalResponse) {
    super("msdyn_IoTGetModelStatusInternal");
  }

  static fromResponse(data: unknown): msdyn_IoTGetModelStatusInternalResponse {
    return new msdyn_IoTGetModelStatusInternalResponse((data as any).value);
  }
}
