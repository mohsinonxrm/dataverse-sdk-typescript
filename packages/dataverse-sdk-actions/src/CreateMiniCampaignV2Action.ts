import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CreateMiniCampaignV2 action
 */
export interface CreateMiniCampaignV2Response {
  BulkOperationId: string;
}

/**
 * CreateMiniCampaignV2 action
 *
 * Unbound action
 */
export class CreateMiniCampaignV2Action implements Executable<CreateMiniCampaignV2Response> {
  constructor(
    public readonly miniCampaignForTypeCode: number,
    public readonly templateId: string,
    public readonly targetOption: number,
    public readonly targetIds: string,
    public readonly fetchXml: string,
    public readonly miniCampaignType: string,
    public readonly activitiesOwnerOption: number,
    public readonly activityXml: string,
    public readonly miniCampaignName: string,
    public readonly postWorkflowEvent: boolean,
    public readonly ownerId: string,
    public readonly ownerTypeCode: number,
    public readonly sendEmail: boolean,
    public readonly queueId?: string
  ) {}

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
    return data as CreateMiniCampaignV2Response;
  }
}
