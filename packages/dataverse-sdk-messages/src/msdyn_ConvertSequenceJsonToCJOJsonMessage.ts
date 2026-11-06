import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ConvertSequenceJsonToCJOJsonResponse as msdyn_ConvertSequenceJsonToCJOJsonResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ConvertSequenceJsonToCJOJson message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertSequenceJsonToCJOJsonRequestParameters {
  SequenceId: string;
}

/**
 * msdyn_ConvertSequenceJsonToCJOJson request message
 *
 * Web API Action: msdyn_ConvertSequenceJsonToCJOJson
 */
export class msdyn_ConvertSequenceJsonToCJOJsonRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConvertSequenceJsonToCJOJsonResponse>
{
  declare readonly Parameters: Readonly<msdyn_ConvertSequenceJsonToCJOJsonRequestParameters>;

  constructor(parameters: msdyn_ConvertSequenceJsonToCJOJsonRequestParameters) {
    super("msdyn_ConvertSequenceJsonToCJOJson", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertSequenceJsonToCJOJson`;

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

  async parseResponse(response: Response): Promise<msdyn_ConvertSequenceJsonToCJOJsonResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ConvertSequenceJsonToCJOJsonResponse.fromResponse({});
    return msdyn_ConvertSequenceJsonToCJOJsonResponse.fromResponse(await response.json());
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
