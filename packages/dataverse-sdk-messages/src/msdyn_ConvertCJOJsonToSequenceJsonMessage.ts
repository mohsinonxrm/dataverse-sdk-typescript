import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ConvertCJOJsonToSequenceJsonResponse as msdyn_ConvertCJOJsonToSequenceJsonResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ConvertCJOJsonToSequenceJson message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertCJOJsonToSequenceJsonRequestParameters {
  SequenceId: string;
}

/**
 * msdyn_ConvertCJOJsonToSequenceJson request message
 *
 * Web API Action: msdyn_ConvertCJOJsonToSequenceJson
 */
export class msdyn_ConvertCJOJsonToSequenceJsonRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConvertCJOJsonToSequenceJsonResponse>
{
  declare readonly Parameters: Readonly<msdyn_ConvertCJOJsonToSequenceJsonRequestParameters>;

  constructor(parameters: msdyn_ConvertCJOJsonToSequenceJsonRequestParameters) {
    super("msdyn_ConvertCJOJsonToSequenceJson", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertCJOJsonToSequenceJson`;

    const body = requestBody({
      SequenceId: this.Parameters.SequenceId,
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

  async parseResponse(response: Response): Promise<msdyn_ConvertCJOJsonToSequenceJsonResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ConvertCJOJsonToSequenceJsonResponse.fromResponse(text ? JSON.parse(text) : {});
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
