import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CreateMiniCampaignV2Response as CreateMiniCampaignV2ResponseData } from "./types/index.js";

/**
 * Parameters of the CreateMiniCampaignV2 message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateMiniCampaignV2RequestParameters {
  MiniCampaignForTypeCode: number;
  TemplateId: string;
  TargetOption: number;
  TargetIds: string;
  FetchXml: string;
  MiniCampaignType: string;
  ActivitiesOwnerOption: number;
  ActivityXml: string;
  MiniCampaignName: string;
  PostWorkflowEvent: boolean;
  OwnerId: string;
  OwnerTypeCode: number;
  sendEmail: boolean;
  QueueId?: string;
  ExtendedActivityParameters?: string;
}

/**
 * CreateMiniCampaignV2 request message
 *
 * Web API Action: CreateMiniCampaignV2
 */
export class CreateMiniCampaignV2Request
  extends OrganizationRequest
  implements Executable<CreateMiniCampaignV2Response>
{
  declare readonly Parameters: Readonly<CreateMiniCampaignV2RequestParameters>;

  constructor(parameters: CreateMiniCampaignV2RequestParameters) {
    super("CreateMiniCampaignV2", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateMiniCampaignV2`;

    const body = requestBody({
      MiniCampaignForTypeCode: this.Parameters.MiniCampaignForTypeCode,
      TemplateId: this.Parameters.TemplateId,
      TargetOption: this.Parameters.TargetOption,
      TargetIds: this.Parameters.TargetIds,
      FetchXml: this.Parameters.FetchXml,
      MiniCampaignType: this.Parameters.MiniCampaignType,
      ActivitiesOwnerOption: this.Parameters.ActivitiesOwnerOption,
      ActivityXml: this.Parameters.ActivityXml,
      MiniCampaignName: this.Parameters.MiniCampaignName,
      PostWorkflowEvent: this.Parameters.PostWorkflowEvent,
      OwnerId: this.Parameters.OwnerId,
      OwnerTypeCode: this.Parameters.OwnerTypeCode,
      sendEmail: this.Parameters.sendEmail,
      QueueId: this.Parameters.QueueId,
      ExtendedActivityParameters: this.Parameters.ExtendedActivityParameters,
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

  async parseResponse(response: Response): Promise<CreateMiniCampaignV2Response> {
    // 204 No Content is an empty result
    if (response.status === 204) return CreateMiniCampaignV2Response.fromResponse({});
    return CreateMiniCampaignV2Response.fromResponse(await response.json());
  }
}

/**
 * CreateMiniCampaignV2 response message
 */
export class CreateMiniCampaignV2Response extends OrganizationResponse {
  constructor(public result: CreateMiniCampaignV2ResponseData) {
    super("CreateMiniCampaignV2");
  }

  static fromResponse(data: unknown): CreateMiniCampaignV2Response {
    return new CreateMiniCampaignV2Response(responseObject<CreateMiniCampaignV2ResponseData>(data));
  }
}
