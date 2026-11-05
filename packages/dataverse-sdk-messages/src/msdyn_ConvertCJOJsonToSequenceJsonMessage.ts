import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ConvertCJOJsonToSequenceJsonResponse as msdyn_ConvertCJOJsonToSequenceJsonResponseData } from "./types/index.js";

/**
 * msdyn_ConvertCJOJsonToSequenceJson request message
 *
 * Web API Action: msdyn_ConvertCJOJsonToSequenceJson
 */
export class msdyn_ConvertCJOJsonToSequenceJsonRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConvertCJOJsonToSequenceJsonResponse>
{
  constructor(public sequenceId: string) {
    super("msdyn_ConvertCJOJsonToSequenceJson");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertCJOJsonToSequenceJson`;

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

  async parseResponse(response: Response): Promise<msdyn_ConvertCJOJsonToSequenceJsonResponse> {
    const data = await response.json();
    return msdyn_ConvertCJOJsonToSequenceJsonResponse.fromResponse(data);
  }
}

/**
 * msdyn_ConvertCJOJsonToSequenceJson response message
 */
export class msdyn_ConvertCJOJsonToSequenceJsonResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConvertCJOJsonToSequenceJsonResponseData) {
    super("msdyn_ConvertCJOJsonToSequenceJson");
  }

  static fromResponse(data: unknown): msdyn_ConvertCJOJsonToSequenceJsonResponse {
    return new msdyn_ConvertCJOJsonToSequenceJsonResponse(
      responseObject<msdyn_ConvertCJOJsonToSequenceJsonResponseData>(data)
    );
  }
}
