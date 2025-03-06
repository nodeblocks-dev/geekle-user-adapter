import { defaultAdapter } from "@basaldev/blocks-user-service";
import * as sdk from '@basaldev/blocks-backend-sdk';
import { Logger } from "@basaldev/blocks-backend-sdk";
import { getEnvString } from "../helpers";
import { mailService } from ".";
import { newUserTemplate } from "./templates/newUser";
import { UpdatedUser } from "../types";


  

export function sendEmailToNewRegisteredUsers(adapter: defaultAdapter.UserDefaultAdapter): {
    adapter: defaultAdapter.UserDefaultAdapter;
    methodName: 'updateUser';
    handlerSideEffect: sdk.util.HandlerSideEffect<UpdatedUser>;
  } {
    const sendEmailToNewRegisteredUsersHandler: sdk.util.HandlerSideEffect<
      UpdatedUser
    > = async (
      logger: Logger,
      context: sdk.adapter.AdapterHandlerContext,
      response: sdk.adapter.AdapterHandlerResponse,
      prefetchedData: UpdatedUser | null
    ) => {
      const updatedUser = response.data as UpdatedUser;

      if (updatedUser.typeId !== defaultAdapter.TYPE_ID_CUSTOMER) {
        return response;
      }
  
      if (
        prefetchedData?.customFields?.is_signup_wizard_complete !== true &&
        updatedUser.customFields.is_signup_wizard_complete
      ) {
        const html = sdk.util.buildContentFromTemplateString(
          newUserTemplate,
          {
            email: updatedUser.email,
            demandSiteURL: getEnvString('ADAPTER_CUSTOM_DEMAND_SITE_URL', ''),
          }
        );
        const subject = '[Geekle] アカウントの登録が完了しました';
        const to = updatedUser.email;
        const from = getEnvString('ADAPTER_EMAIL_SENDER', '');
        const mailData = {
          from,
          html,
          subject,
          to: to as unknown as string,
        };
        logger.info(mailData);
        const didSend = await mailService().sendMail(mailData);
        if (!didSend) {
          logger.error({
            message: 'Failed to send email',
            ...mailData,
          });
        }
      }
  
      return response;
    };
  
    return {
      adapter,
      methodName: 'updateUser',
      handlerSideEffect: sendEmailToNewRegisteredUsersHandler,
    };
  }
  
  