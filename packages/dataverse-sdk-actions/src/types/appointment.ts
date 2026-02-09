/**
 * appointment entity type
 */
export interface appointment {
  subcategory: string;
  subscriptionid: string;
  category: string;
  onlinemeetingjoinurl: string;
  onlinemeetingchatid: string;
  isdraft: boolean;
  onlinemeetingtype: number;
  location: string;
  isalldayevent: boolean;
  originalstartdate: string;
  modifiedfieldsmask: string;
  outlookownerapptid: number;
  isonlinemeeting: boolean;
  isunsafe: number;
  onlinemeetingid: string;
  attachmenterrors: number;
  importsequencenumber: number;
  overriddencreatedon: string;
  globalobjectid: string;
}
