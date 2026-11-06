import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TriggerIntegratedSearchIngestionResponse as msdyn_TriggerIntegratedSearchIngestionResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerIntegratedSearchIngestionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TriggerIntegratedSearchIngestionResponse.fromResponse({});
    return msdyn_TriggerIntegratedSearchIngestionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TriggerIntegratedSearchIngestion response message
 */
export class msdyn_TriggerIntegratedSearchIngestionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerIntegratedSearchIngestionResponseData) {
    super("msdyn_TriggerIntegratedSearchIngestion");
  }

  static fromResponse(data: unknown): msdyn_TriggerIntegratedSearchIngestionResponse {
    return new msdyn_TriggerIntegratedSearchIngestionResponse(
      responseObject<msdyn_TriggerIntegratedSearchIngestionResponseData>(data)
    );
  }
}
