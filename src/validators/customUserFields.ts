import * as sdk from '@basaldev/blocks-backend-sdk';
import { CustomFieldsValidators, UpdatedUser } from '../types';
import { defaultAdapter } from '@basaldev/blocks-user-service';
  
  export const customFieldsValidators: CustomFieldsValidators = [
    (adapter: defaultAdapter.UserDefaultAdapter): defaultAdapter.UserDefaultAdapter => {
      const validator: sdk.security.Predicate = async (logger, context) => {

        const updatedUser = context.body as UpdatedUser;

        if (updatedUser.typeId !== defaultAdapter.TYPE_ID_CUSTOMER) {
          return sdk.util.StatusCodes.OK;
        }
        
        const {katakana_name} = context.body.customFields ?? {};

        const katakanaRegex = /^[ァ-ヶー　]+$/;
  
        if (!katakana_name || katakanaRegex.test(katakana_name)) {
          return sdk.util.StatusCodes.OK;
        }
  
        throw new sdk.NBError({
          code: 'katakana_name_wrong_format',
          httpCode: sdk.util.StatusCodes.BAD_REQUEST,
          message: `katakana_name ${katakana_name} needs to contain all katakana.`,
        });
      };
  
      adapter = sdk.adapter.setValidator(
        adapter,
        'createUser',
        'valid_katakana_create',
        validator
      );
      adapter = sdk.adapter.setValidator(
        adapter,
        'updateUser',
        'valid_katakana_update',
        validator
      );
      return adapter;
    },
    (adapter: defaultAdapter.UserDefaultAdapter): defaultAdapter.UserDefaultAdapter => {
      const validator: sdk.security.Predicate = async (logger, context) => {

        const updatedUser = context.body as UpdatedUser;

        if (updatedUser.typeId !== defaultAdapter.TYPE_ID_CUSTOMER) {
          return sdk.util.StatusCodes.OK;
        }

        const {years_experience} = context.body.customFields ?? {};
        const yearsExperienceValues = ['lt1', '1-3', '3-5', '5-10', 'gt10'];
  
        if (!years_experience) {
          return sdk.util.StatusCodes.OK;
        }
  
        if (typeof years_experience === 'object') {
          const typedYearsExperience: Record<string, string> = years_experience;
  
          if (
            !Object.values(typedYearsExperience).some(
              value => !yearsExperienceValues.includes(value)
            )
          ) {
            return sdk.util.StatusCodes.OK;
          }
        }
  
        throw new sdk.NBError({
          code: 'years_experience_wrong_format',
          httpCode: sdk.util.StatusCodes.BAD_REQUEST,
          message: `years_experience ${years_experience} is in the wrong format.`,
        });
      };
  
      adapter = sdk.adapter.setValidator(
        adapter,
        'createUser',
        'valid_years_experience_create',
        validator
      );
      adapter = sdk.adapter.setValidator(
        adapter,
        'updateUser',
        'valid_years_experience_update',
        validator
      );
      return adapter;
    },
    (adapter: defaultAdapter.UserDefaultAdapter): defaultAdapter.UserDefaultAdapter => {
      const validator: sdk.security.Predicate = async (logger, context) => {
        const updatedUser = context.body as UpdatedUser;

        if (updatedUser.typeId !== defaultAdapter.TYPE_ID_CUSTOMER) {
          return sdk.util.StatusCodes.OK;
        }

        const {compensation_type} = context.body.customFields ?? {};
        const compensationTypeValues = ['month', 'hour', 'day'];
  
        if (
          !compensation_type ||
          compensationTypeValues.includes(compensation_type)
        ) {
          return sdk.util.StatusCodes.OK;
        }
        throw new sdk.NBError({
          code: 'compensation_type_wrong_format',
          httpCode: sdk.util.StatusCodes.BAD_REQUEST,
          message: `compensation_type ${compensation_type} is in the wrong format.`,
        });
      };
  
      adapter = sdk.adapter.setValidator(
        adapter,
        'createUser',
        'valid_compensation_type_create',
        validator
      );
      adapter = sdk.adapter.setValidator(
        adapter,
        'updateUser',
        'valid_compensation_type_update',
        validator
      );
      return adapter;
    },
    (adapter: defaultAdapter.UserDefaultAdapter): defaultAdapter.UserDefaultAdapter => {
      const validator: sdk.security.Predicate = async (logger, context) => {
        const updatedUser = context.body as UpdatedUser;

        if (updatedUser.typeId !== defaultAdapter.TYPE_ID_CUSTOMER) {
          return sdk.util.StatusCodes.OK;
        }

        const {compensation_amount, compensation_type} =
          context.body.customFields ?? {};
        const compensationAmountValues: {[key: string]: string[]} = {
          month: [
            'lt200000',
            '200000-400000',
            '400000-600000',
            '600000-800000',
            '800000-1000000',
            'gt1000000',
          ],
          day: [
            'lt10000',
            '10000-20000',
            '20000-30000',
            '30000-40000',
            '40000-50000',
            'gt50000',
          ],
          hour: [
            'lt2000',
            '2000-3000',
            '3000-4000',
            '4000-5000',
            '5000-6000',
            'gt6000',
          ],
        };
  
        if (!compensation_amount && !compensation_type) {
          return sdk.util.StatusCodes.OK;
        }
  
        if (!compensationAmountValues[compensation_type]) {
          throw new sdk.NBError({
            code: 'compensation_type_wrong_format',
            httpCode: sdk.util.StatusCodes.BAD_REQUEST,
            message: `compensation_type ${compensation_type} is in the wrong format.`,
          });
        }
        if (
          !compensationAmountValues[compensation_type].includes(
            compensation_amount
          )
        ) {
          throw new sdk.NBError({
            code: 'compensation_amount_wrong_format',
            httpCode: sdk.util.StatusCodes.BAD_REQUEST,
            message: `compensation_amount ${compensation_amount} is in the wrong format.`,
          });
        }
        return sdk.util.StatusCodes.OK;
      };
  
      adapter = sdk.adapter.setValidator(
        adapter,
        'createUser',
        'valid_compensation_type_amount_create',
        validator
      );
      adapter = sdk.adapter.setValidator(
        adapter,
        'updateUser',
        'valid_compensation_type_amount_update',
        validator
      );
      return adapter;
    },
  ];
  