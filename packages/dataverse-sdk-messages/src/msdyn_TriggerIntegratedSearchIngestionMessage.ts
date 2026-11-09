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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerIntegratedSearchIngestionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TriggerIntegratedSearchIngestionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TriggerIntegratedSearchIngestion action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TriggerIntegratedSearchIngestionResult {
  "@odata.context"?: string;
  msdyn_IntegratedSearchIngestionResponse: string;
}

/**
 * msdyn_TriggerIntegratedSearchIngestion response message
 *
 * `result` is the value the msdyn_TriggerIntegratedSearchIngestion action returns (see {@link msdyn_TriggerIntegratedSearchIngestionResult}).
 */
export class msdyn_TriggerIntegratedSearchIngestionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerIntegratedSearchIngestionResult) {
    super("msdyn_TriggerIntegratedSearchIngestion");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TriggerIntegratedSearchIngestionResponse {
    return new msdyn_TriggerIntegratedSearchIngestionResponse(
      data as msdyn_TriggerIntegratedSearchIngestionResult
    );
  }
}
