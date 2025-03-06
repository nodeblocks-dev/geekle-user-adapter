import { getEnvBool } from "../../helpers";

const inviteUserTemplate = {
  admin: {
    body: `
<p>Geekleをご利用いただきありがとうございます。</p>
<p>招待が届いています。下記のURLより登録を行なってください。</p>
<p><a href="\${url}">\${url}</a></p>
<p>*※本メールは送信専用のメールアドレスで送信しております。
本メールにご返信いただいてもお答えできません。あらかじめご了承ください。</p>
<br />
Geekle<br />
<a href="https://dev.geekle-admin.nodeblocks.dev/">https://dev.geekle-admin.nodeblocks.dev/</a><br />
<br />
運営会社 Geekle
          `,
    subject: 'Geekleへの招待',
    url: "https://dev.geekle-admin.nodeblocks.dev/auth/accept-invitation/${invitationId}/${token}?email=${email}"
  },

}
