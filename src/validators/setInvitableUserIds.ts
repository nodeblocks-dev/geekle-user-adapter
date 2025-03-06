import { defaultAdapter } from "@basaldev/blocks-user-service";
import * as sdk from '@basaldev/blocks-backend-sdk';

export function setInvitableUserIds(adapter: defaultAdapter.UserDefaultAdapter): defaultAdapter.UserDefaultAdapter {
    return sdk.adapter.setValidator(
      adapter,
      'acceptInvitation',
      'hasAllowedTypeId',
      (logger, context) =>
        defaultAdapter.hasAllowedTypeId(['100', '010'], logger, context)
    );
  }
  
  