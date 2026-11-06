import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_EmailClassificationCustomActionResponse as msdyn_EmailClassificationCustomActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_EmailClassificationCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailClassificationCustomActionRequestParameters {
  emailId: string;
  additionalInfo?: string;
  doRuleEvaluation: boolean;
  isSimulationMode?: boolean;
}

/**
 * msdyn_EmailClassificationCustomAction request message
 *
 * Web API Action: msdyn_EmailClassificationCustomAction
 */
export class msdyn_EmailClassificationCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_EmailClassificationCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_EmailClassificationCustomActionRequestParameters>;

  constructor(parameters: msdyn_EmailClassificationCustomActionRequestParameters) {
    super("msdyn_EmailClassificationCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailClassificationCustomAction`;

    const body = requestBody({
      emailId: this.Parameters.emailId,
      additionalInfo: this.Parameters.additionalInfo,
      doRuleEvaluation: this.Parameters.doRuleEvaluation,
      isSimulationMode: this.Parameters.isSimulationMode,
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

  async parseResponse(response: Response): Promise<msdyn_EmailClassificationCustomActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_EmailClassificationCustomActionResponse.fromResponse({});
    return msdyn_EmailClassificationCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_EmailClassificationCustomAction response message
 */
export class msdyn_EmailClassificationCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_EmailClassificationCustomActionResponseData) {
    super("msdyn_EmailClassificationCustomAction");
  }

  static fromResponse(data: unknown): msdyn_EmailClassificationCustomActionResponse {
    return new msdyn_EmailClassificationCustomActionResponse(
      responseObject<msdyn_EmailClassificationCustomActionResponseData>(data)
    );
  }
}
