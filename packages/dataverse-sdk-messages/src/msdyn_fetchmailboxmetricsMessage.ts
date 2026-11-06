import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_fetchmailboxmetricsResponse as msdyn_fetchmailboxmetricsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_fetchmailboxmetrics message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_fetchmailboxmetricsRequestParameters {
  filterDate?: string;
  mailboxId?: string;
}

/**
 * msdyn_fetchmailboxmetrics request message
 *
 * Web API Action: msdyn_fetchmailboxmetrics
 */
export class msdyn_fetchmailboxmetricsRequest
  extends OrganizationRequest
  implements Executable<msdyn_fetchmailboxmetricsResponse>
{
  declare readonly Parameters: Readonly<msdyn_fetchmailboxmetricsRequestParameters>;

  constructor(parameters: msdyn_fetchmailboxmetricsRequestParameters = {}) {
    super("msdyn_fetchmailboxmetrics", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchmailboxmetrics`;

    const body = requestBody({
      filterDate: this.Parameters.filterDate,
      mailboxId: this.Parameters.mailboxId,
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

  async parseResponse(response: Response): Promise<msdyn_fetchmailboxmetricsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_fetchmailboxmetricsResponse.fromResponse({});
    return msdyn_fetchmailboxmetricsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_fetchmailboxmetrics response message
 */
export class msdyn_fetchmailboxmetricsResponse extends OrganizationResponse {
  constructor(public result: msdyn_fetchmailboxmetricsResponseData) {
    super("msdyn_fetchmailboxmetrics");
  }

  static fromResponse(data: unknown): msdyn_fetchmailboxmetricsResponse {
    return new msdyn_fetchmailboxmetricsResponse(
      responseObject<msdyn_fetchmailboxmetricsResponseData>(data)
    );
  }
}
