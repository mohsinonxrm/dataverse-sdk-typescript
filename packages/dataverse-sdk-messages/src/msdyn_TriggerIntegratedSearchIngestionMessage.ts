import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TriggerIntegratedSearchIngestion request message
 *
 * Web API Action: msdyn_TriggerIntegratedSearchIngestion
 */
export class msdyn_TriggerIntegratedSearchIngestionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerIntegratedSearchIngestionResponse>
{
  constructor() {
    super("msdyn_TriggerIntegratedSearchIngestion");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerIntegratedSearchIngestion`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerIntegratedSearchIngestionResponse> {
    const data = await response.json();
    return msdyn_TriggerIntegratedSearchIngestionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_TriggerIntegratedSearchIngestion response message
 */
export class msdyn_TriggerIntegratedSearchIngestionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerIntegratedSearchIngestionResponse) {
    super("msdyn_TriggerIntegratedSearchIngestion");
  }

  static fromResponse(data: unknown): msdyn_TriggerIntegratedSearchIngestionResponse {
    return new msdyn_TriggerIntegratedSearchIngestionResponse((data as any).value);
  }
}
