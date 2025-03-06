import { getEnvBool, getEnvString } from "../../helpers";

export const verifyChangeEmailTemplate = {
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
  vendor: {
    bodyTemplate: `
      <p>メールアドレスの更新リクエストが送信されました。</p>
      <p>以下のURLにアクセスし、メールアドレスの変更を完了してください。</p>
      <p><a href="\${url}">\${url}</a></p>
      <p>※このメールは送信専用のメールアドレスから送信されています。</p>
      <p>このメールに返信することはできません。ご了承ください。</p>
      <br />
      <p>Geekle</p>
      <a href="${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}">${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}</a>
      <br />
      <br />
      <p>運営会社 Geekle</p>
    `,
    subject: 'メールアドレス認証のお願い',
    urlTemplate: ''
  },
  customer: {
    bodyTemplate: `
      <p>メールアドレスの更新リクエストが送信されました。</p>
      <p>以下のURLにアクセスし、メールアドレスの変更を完了してください。</p>
      <p><a href="\${url}">\${url}</a></p>
      <p>※このメールは送信専用のメールアドレスから送信されています。</p>
      <p>このメールに返信することはできません。ご了承ください。</p>
      <br />
      <p>Geekle</p>
      <a href="${getEnvString('ADAPTER_CUSTOM_DEMAND_SITE_URL')}">${getEnvString('ADAPTER_CUSTOM_DEMAND_SITE_URL')}</a>
      <br />
      <br />
      <p>運営会社 Geekle</p>
    `,
    subject: 'メールアドレス認証のお願い',
    urlTemplate: `${getEnvString('ADAPTER_CUSTOM_DEMAND_SITE_URL')}/settings/verify-change-email-success/` + '${token}'
  },
  enabled: getEnvBool('ADAPTER_EMAIL_VERIFY_CHANGE_EMAIL_ENABLED')
}