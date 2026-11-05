import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CreateMiniCampaignV2 request message
 *
 * Web API Action: CreateMiniCampaignV2
 */
export class CreateMiniCampaignV2Request
  extends OrganizationRequest
  implements Executable<CreateMiniCampaignV2Response>
{
  constructor(
    public miniCampaignForTypeCode: number,
    public templateId: string,
    public targetOption: number,
    public targetIds: string,
    public fetchXml: string,
    public miniCampaignType: string,
    public activitiesOwnerOption: number,
    public activityXml: string,
    public miniCampaignName: string,
    public postWorkflowEvent: boolean,
    public ownerId: string,
    public ownerTypeCode: number,
    public sendEmail: boolean,
    public queueId: string
  ) {
    super("CreateMiniCampaignV2");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateMiniCampaignV2`;

    const body: Record<string, unknown> = {
      MiniCampaignForTypeCode: this.miniCampaignForTypeCode,
      TemplateId: this.templateId,
      TargetOption: this.targetOption,
      TargetIds: this.targetIds,
      FetchXml: this.fetchXml,
      MiniCampaignType: this.miniCampaignType,
      ActivitiesOwnerOption: this.activitiesOwnerOption,
      ActivityXml: this.activityXml,
      MiniCampaignName: this.miniCampaignName,
      PostWorkflowEvent: this.postWorkflowEvent,
      OwnerId: this.ownerId,
      OwnerTypeCode: this.ownerTypeCode,
      sendEmail: this.sendEmail,
      QueueId: this.queueId,
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

  async parseResponse(response: Response): Promise<CreateMiniCampaignV2Response> {
    const data = await response.json();
    return CreateMiniCampaignV2Response.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      MiniCampaignForTypeCode: this.miniCampaignForTypeCode,
      TemplateId: this.templateId,
      TargetOption: this.targetOption,
      TargetIds: this.targetIds,
      FetchXml: this.fetchXml,
      MiniCampaignType: this.miniCampaignType,
      ActivitiesOwnerOption: this.activitiesOwnerOption,
      ActivityXml: this.activityXml,
      MiniCampaignName: this.miniCampaignName,
      PostWorkflowEvent: this.postWorkflowEvent,
      OwnerId: this.ownerId,
      OwnerTypeCode: this.ownerTypeCode,
      sendEmail: this.sendEmail,
      QueueId: this.queueId,
    };
  }
}

/**
 * CreateMiniCampaignV2 response message
 */
export class CreateMiniCampaignV2Response extends OrganizationResponse {
  constructor(public result: CreateMiniCampaignV2Response) {
    super("CreateMiniCampaignV2");
  }

  static fromResponse(data: unknown): CreateMiniCampaignV2Response {
    return new CreateMiniCampaignV2Response((data as any).value);
  }
}
