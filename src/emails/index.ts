import { defaultAdapter } from "@basaldev/blocks-user-service";
import { getEnvString } from "../helpers";
import * as sdk from '@basaldev/blocks-backend-sdk';
import { sendEmailToNewRegisteredUsers } from "./sendEmailToNewRegisteredUsers";

export function mailService() {
    return new sdk.external.mail.SendGridMailService(
      getEnvString('SENDGRID_API_KEY', '')
    );
  }
  
  export async function setEmailHandlers(adapter: defaultAdapter.UserDefaultAdapter) {
    for (const sideEffectHandler of [sendEmailToNewRegisteredUsers]) {
      const sideEffect = sideEffectHandler(adapter);
      adapter = sdk.adapter.addHandlerSideEffect(
        adapter,
        sideEffect.methodName,
        sideEffect.handlerSideEffect
      );
    }
    return adapter;
  }
  
  