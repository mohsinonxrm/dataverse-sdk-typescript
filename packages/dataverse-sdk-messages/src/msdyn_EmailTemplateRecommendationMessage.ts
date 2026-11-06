import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_EmailTemplateRecommendationResponse as msdyn_EmailTemplateRecommendationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_EmailTemplateRecommendation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailTemplateRecommendationRequestParameters {
  Headers?: number;
  customerIntent: string;
  filters?: string;
  templateFiltersInString: string;
  emailString: string;
  isTemplateResponse?: boolean;
  transactionId: string;
  multiturnPayload?: string;
  emailContextData?: string;
  copilotRequestParameters: string;
  emailId: string;
  entityReference?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_EmailTemplateRecommendation request message
 *
 * Web API Action: msdyn_EmailTemplateRecommendation
 */
export class msdyn_EmailTemplateRecommendationRequest
  extends OrganizationRequest
  implements Executable<msdyn_EmailTemplateRecommendationResponse>
{
  declare readonly Parameters: Readonly<msdyn_EmailTemplateRecommendationRequestParameters>;

  constructor(parameters: msdyn_EmailTemplateRecommendationRequestParameters) {
    super("msdyn_EmailTemplateRecommendation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailTemplateRecommendation`;

    const body = requestBody({
      Headers: this.Parameters.Headers,
      customerIntent: this.Parameters.customerIntent,
      filters: this.Parameters.filters,
      templateFiltersInString: this.Parameters.templateFiltersInString,
      emailString: this.Parameters.emailString,
      isTemplateResponse: this.Parameters.isTemplateResponse,
      transactionId: this.Parameters.transactionId,
      multiturnPayload: this.Parameters.multiturnPayload,
      emailContextData: this.Parameters.emailContextData,
      copilotRequestParameters: this.Parameters.copilotRequestParameters,
      emailId: this.Parameters.emailId,
      entityReference: this.Parameters.entityReference,
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

  async parseResponse(response: Response): Promise<msdyn_EmailTemplateRecommendationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_EmailTemplateRecommendationResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_EmailTemplateRecommendation response message
 */
export class msdyn_EmailTemplateRecommendationResponse extends OrganizationResponse {
  constructor(public result: msdyn_EmailTemplateRecommendationResponseData) {
    super("msdyn_EmailTemplateRecommendation");
  }

  static fromResponse(data: unknown): msdyn_EmailTemplateRecommendationResponse {
    return new msdyn_EmailTemplateRecommendationResponse(
      responseObject<msdyn_EmailTemplateRecommendationResponseData>(data)
    );
  }
}
