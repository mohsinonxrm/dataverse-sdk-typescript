import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ConvertSequenceJsonToCJOJsonResponse as msdyn_ConvertSequenceJsonToCJOJsonResponseData } from "./types/index.js";

/**
 * msdyn_ConvertSequenceJsonToCJOJson request message
 *
 * Web API Action: msdyn_ConvertSequenceJsonToCJOJson
 */
export class msdyn_ConvertSequenceJsonToCJOJsonRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConvertSequenceJsonToCJOJsonResponse>
{
  constructor(public sequenceId: string) {
    super("msdyn_ConvertSequenceJsonToCJOJson");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertSequenceJsonToCJOJson`;

    const body: Record<string, unknown> = {
      SequenceId: this.sequenceId,
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

  async parseResponse(response: Response): Promise<msdyn_ConvertSequenceJsonToCJOJsonResponse> {
    const data = await response.json();
    return msdyn_ConvertSequenceJsonToCJOJsonResponse.fromResponse(data);
  }
}

/**
 * msdyn_ConvertSequenceJsonToCJOJson response message
 */
export class msdyn_ConvertSequenceJsonToCJOJsonResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConvertSequenceJsonToCJOJsonResponseData) {
    super("msdyn_ConvertSequenceJsonToCJOJson");
  }

  static fromResponse(data: unknown): msdyn_ConvertSequenceJsonToCJOJsonResponse {
    return new msdyn_ConvertSequenceJsonToCJOJsonResponse(
      responseObject<msdyn_ConvertSequenceJsonToCJOJsonResponseData>(data)
    );
  }
}
