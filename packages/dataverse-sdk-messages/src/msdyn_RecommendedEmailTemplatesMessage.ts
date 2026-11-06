import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RecommendedEmailTemplatesResponse as msdyn_RecommendedEmailTemplatesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RecommendedEmailTemplates message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RecommendedEmailTemplatesRequestParameters {
  emailString: string;
  emailContextData?: string;
  isTemplateResponse?: boolean;
  templateFiltersInString: string;
  multiturnPayload?: string;
  emailId: string;
  copilotRequestParameters: string;
  customerIntent: string;
  filters?: string;
  transactionId: string;
}

/**
 * msdyn_RecommendedEmailTemplates request message
 *
 * Web API Action: msdyn_RecommendedEmailTemplates
 */
export class msdyn_RecommendedEmailTemplatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RecommendedEmailTemplatesResponse>
{
  declare readonly Parameters: Readonly<msdyn_RecommendedEmailTemplatesRequestParameters>;

  constructor(parameters: msdyn_RecommendedEmailTemplatesRequestParameters) {
    super("msdyn_RecommendedEmailTemplates", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RecommendedEmailTemplates`;

    const body = requestBody({
      emailString: this.Parameters.emailString,
      emailContextData: this.Parameters.emailContextData,
      isTemplateResponse: this.Parameters.isTemplateResponse,
      templateFiltersInString: this.Parameters.templateFiltersInString,
      multiturnPayload: this.Parameters.multiturnPayload,
      emailId: this.Parameters.emailId,
      copilotRequestParameters: this.Parameters.copilotRequestParameters,
      customerIntent: this.Parameters.customerIntent,
      filters: this.Parameters.filters,
      transactionId: this.Parameters.transactionId,
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

  async parseResponse(response: Response): Promise<msdyn_RecommendedEmailTemplatesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RecommendedEmailTemplatesResponse.fromResponse({});
    return msdyn_RecommendedEmailTemplatesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RecommendedEmailTemplates response message
 */
export class msdyn_RecommendedEmailTemplatesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RecommendedEmailTemplatesResponseData) {
    super("msdyn_RecommendedEmailTemplates");
  }

  static fromResponse(data: unknown): msdyn_RecommendedEmailTemplatesResponse {
    return new msdyn_RecommendedEmailTemplatesResponse(
      responseObject<msdyn_RecommendedEmailTemplatesResponseData>(data)
    );
  }
}
