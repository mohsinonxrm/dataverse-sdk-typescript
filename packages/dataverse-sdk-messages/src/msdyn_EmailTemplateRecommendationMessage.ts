import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_EmailTemplateRecommendationResponse as msdyn_EmailTemplateRecommendationResponseData } from "./types/index.js";

/**
 * msdyn_EmailTemplateRecommendation request message
 *
 * Web API Action: msdyn_EmailTemplateRecommendation
 */
export class msdyn_EmailTemplateRecommendationRequest
  extends OrganizationRequest
  implements Executable<msdyn_EmailTemplateRecommendationResponse>
{
  constructor(
    public headers: number | undefined,
    public customerIntent: string,
    public filters: string | undefined,
    public templateFiltersInString: string,
    public emailString: string,
    public isTemplateResponse: boolean | undefined,
    public transactionId: string,
    public multiturnPayload: string | undefined,
    public emailContextData: string | undefined,
    public copilotRequestParameters: string,
    public emailId: string,
    public entityReference?: EntityReference | AnyEntityPayload
  ) {
    super("msdyn_EmailTemplateRecommendation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailTemplateRecommendation`;

    const body: Record<string, unknown> = {
      Headers: this.headers,
      customerIntent: this.customerIntent,
      filters: this.filters,
      templateFiltersInString: this.templateFiltersInString,
      emailString: this.emailString,
      isTemplateResponse: this.isTemplateResponse,
      transactionId: this.transactionId,
      multiturnPayload: this.multiturnPayload,
      emailContextData: this.emailContextData,
      copilotRequestParameters: this.copilotRequestParameters,
      emailId: this.emailId,
      entityReference: this.entityReference,
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

  async parseResponse(response: Response): Promise<msdyn_EmailTemplateRecommendationResponse> {
    const data = await response.json();
    return msdyn_EmailTemplateRecommendationResponse.fromResponse(data);
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
