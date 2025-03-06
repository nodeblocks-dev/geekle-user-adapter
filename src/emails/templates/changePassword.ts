import { getEnvBool, getEnvString } from "../../helpers";

export const changePasswordTemplate = {
  admin: {
    bodyTemplate: `
      <p>Geekleをご利用いただきありがとうございます。</p>
      <br />
      <p>パスワードの変更が完了しました。</p>
      <br />
      <p>この変更に覚えがない場合は、速やかに以下のリンクからパスワードを再設定してください</p>
      <br />
      <a href="${getEnvString('ADAPTER_CUSTOM_ADMIN_SITE_URL')}/settings/change-password">${getEnvString('ADAPTER_CUSTOM_ADMIN_SITE_URL')}/settings/change-password</a>
      <br />
      <br />
      <p>本メールは送信専用のアドレスです。</p>
      <p>このメールに心当たりがない場合は、お問い合わせください。</p>
      <br />
      <p>運営会社 Geekle</p>
    `,
    subject: '[Geekle] パスワードの変更が完了しました',
    urlTemplate: ''
  },
  customer: {
    bodyTemplate: `
      <p>Geekleをご利用いただきありがとうございます。</p>
      <br />
      <p>パスワードの変更が完了しました。</p>
      <br />
      <p>この変更に覚えがない場合は、速やかに以下のリンクからパスワードを再設定してください</p>
      <br />
      <a href="${getEnvString('ADAPTER_CUSTOM_DEMAND_SITE_URL')}/settings/change-password">${getEnvString('ADAPTER_CUSTOM_DEMAND_SITE_URL')}/settings/change-password</a>
      <br />
      <br />
      <p>本メールは送信専用のアドレスです。</p>
      <p>このメールに心当たりがない場合は、お問い合わせください。</p>
      <br />
      <p>-------------------</p>
      <br />
      <p>{運営会社名} Geekle 運営事務局</p>
      <br />
      <p>{郵便番号} {住所}</p>
      <br />
      <p>お問い合わせ メールアドレス ：{問い合わせメールアドレス}</p>
    `,
    subject: '[Geekle] パスワードの変更が完了しました',
    urlTemplate: ''
  },
  vendor: {
    bodyTemplate: `
      <p>Geekleをご利用いただきありがとうございます。</p>
      <br />
      <p>パスワードの変更が完了しました。</p>
      <br />
      <p>この変更に覚えがない場合は、速やかに以下のリンクからパスワードを再設定してください</p>
      <br />
      <a href="${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}/settings/change-password">${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}/settings/change-password</a>
      <br />
      <br />
      <p>本メールは送信専用のアドレスです。</p>
      <p>このメールに心当たりがない場合は、お問い合わせください。</p>
      <br />
      <p>運営会社 Geekle</p>
    `,
    subject: '[Geekle] パスワードの変更が完了しました',
    urlTemplate: ''
  },
  enabled: getEnvBool('ADAPTER_EMAIL_CHANGE_PASSWORD_ENABLED')
}