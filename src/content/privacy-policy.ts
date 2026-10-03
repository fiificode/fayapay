// The privacy policy, word for word from fayapay.com/privacy. It is legal text:
// change it only when the policy itself changes.
export const privacyPolicyHtml = `
<h1 id="fayapay-privacy-policy">FayaPay Privacy Policy</h1>
<p>Effective date: 30 September 2026</p>
<p>This policy explains what the FayaPay app for Android reads, what stays on your phone, and what leaves it.</p>
<h2 id="who-we-are">Who we are</h2>
<p>FayaPay is published by Fayaworks Technologies, LLC, a Delaware limited liability company. Fayaworks Technologies, LLC is the data controller for the data described here.</p>
<p>Contact: <a href="mailto:support@fayapay.com">support@fayapay.com</a></p>
<h2 id="what-fayapay-does">What FayaPay does</h2>
<p>FayaPay runs your mobile money USSD menus for you. You pick an action, such as Send money or Check balance, and enter what it needs. FayaPay dials the USSD code and answers the carrier's menus with what you entered, following a fixed set of steps written for that menu. You type your PIN each time. FayaPay never saves your PIN.</p>
<p>FayaPay also reads your mobile money SMS receipts to show your payments and balances in one list.</p>
<p>FayaPay has no user accounts and no server of its own that holds your data. Your payments, balances and settings are stored on your phone.</p>
<h2 id="what-fayapay-reads-on-your-phone">What FayaPay reads on your phone</h2>
<p>Everything in this section is read and kept only on your phone. None of it is sent to us or to anyone else.</p>
<ul>
<li><strong>USSD pop-ups, while a flow runs.</strong> With your agreement, FayaPay uses Android's Accessibility service to read your carrier's USSD pop-ups and to choose options and type your answers, including your PIN. The service only watches the phone app that shows USSD pop-ups. It does not read other apps or anything else on your screen. The result of a flow, such as your balance, is kept on your phone.</li>
<li><strong>Mobile money SMS receipts.</strong> With your agreement and Android's SMS permission, FayaPay reads SMS from the senders your mobile money and payment providers use to build your transaction history and show your balance. It does not read your other messages. Your SMS stay on your phone.</li>
<li><strong>Your SIM cards and their numbers.</strong> With Android's Phone permission, FayaPay sees which SIMs are in your phone and their numbers, to set up an account for each SIM and to dial USSD on the right SIM.</li>
<li><strong>Your contacts, only when you pick a recipient.</strong> If you allow Contacts, FayaPay lists your contacts' names and numbers when you choose who to send money to. This is optional; you can type a number instead.</li>
</ul>
<p>When a flow runs, the numbers and amounts you enter go to your carrier through its USSD menu, exactly as if you dialled the code yourself.</p>
<h2 id="what-leaves-your-phone">What leaves your phone</h2>
<h3 id="usage-and-crash-reports-you-can-turn-these-off">Usage and crash reports (you can turn these off)</h3>
<p>FayaPay uses Google Firebase, a service of Google LLC, as our processor:</p>
<ul>
<li><strong>Firebase Crashlytics</strong> receives crash reports: the type of error and where in the app's code it happened (never the error's message text, so never your SMS, numbers or PIN), and device details such as the phone model and Android version, with an installation identifier.</li>
<li><strong>Google Analytics for Firebase</strong> receives usage events: which screens you open and which actions you use (for example that a Send money flow finished, failed or timed out, and how long it took), an app-instance identifier, and a coarse location (region) that Google derives from your IP address.</li>
</ul>
<p>These reports never include your SMS, phone numbers, contacts, names, amounts or PIN.</p>
<p>You can turn them off in <strong>Settings → Personalise → Share usage and crash reports</strong>. When the switch is off, FayaPay sends no usage events or crash reports, and deletes any crash reports it has not yet sent, so they are not sent if you turn the switch back on. It is on by default.</p>
<p>FayaPay does not use the advertising ID and does not collect it. Google processes this data on its servers, which may be outside Ghana. See Google's privacy policy at <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a>.</p>
<h3 id="an-sms-you-choose-to-report">An SMS you choose to report</h3>
<p>If FayaPay cannot read some of your mobile money SMS, you can tap <strong>Report</strong> on one of them, or <strong>Report all</strong> to report every one it couldn't read. FayaPay then opens your own email app with a message to <a href="mailto:support@fayapay.com">support@fayapay.com</a> containing the text of those SMS and your provider's name. Before the email opens, FayaPay hides every phone number in those SMS except its last 2 digits (for example 0XXXXXXX87). You can read and change the message before you send it, and nothing is sent unless you send it. We use it only to teach FayaPay to read that kind of SMS, and we delete it once that is done.</p>
<p>If you email us at <a href="mailto:support@fayapay.com">support@fayapay.com</a>, we receive your email address and what you write, and use them only to answer you.</p>
<h3 id="updates-to-fayapays-flows-and-sms-rules">Updates to FayaPay's flows and SMS rules</h3>
<p>FayaPay may check, at most once a day, for updates to the data that describes carriers' USSD menus and how to read their SMS receipts. Updates are data files signed by us, not program code. Checking and downloading sends no information about you; like any download, the server hosting the files sees your IP address.</p>
<h2 id="what-we-dont-do">What we don't do</h2>
<ul>
<li>We show no ads and do not use the advertising ID.</li>
<li>We do not sell your data or share it with anyone for their own use.</li>
<li>We do not upload your SMS, contacts, phone numbers, transactions or balances.</li>
<li>We never save your PIN.</li>
</ul>
<h2 id="how-long-we-keep-data">How long we keep data</h2>
<ul>
<li>On your phone: until you remove the account (removing a SIM's account in FayaPay deletes its data) or uninstall the app, which deletes everything.</li>
<li>Crash reports: 90 days in Firebase Crashlytics.</li>
<li>Usage events: up to 14 months in Google Analytics.</li>
<li>Reported SMS and support emails: until the issue is resolved, then deleted.</li>
</ul>
<h2 id="children">Children</h2>
<p>FayaPay is for adults who have a mobile money account. It is not directed at children, and we do not knowingly collect data from children under 13.</p>
<h2 id="security">Security</h2>
<p>Usage and crash reports are sent over encrypted connections (HTTPS). Data on your phone is kept in FayaPay's private storage, which other apps cannot read, and is excluded from Android backups.</p>
<h2 id="your-rights">Your rights</h2>
<p>For users in Ghana, the Data Protection Act, 2012 (Act 843) gives you the right to know what personal data we hold about you, to have it corrected or deleted, and to object to its processing. Because almost everything stays on your phone, you control most of it directly: turn off usage and crash reports in Settings, remove an account, or uninstall the app. For anything else, including deleting usage and crash data linked to your phone, email <a href="mailto:support@fayapay.com">support@fayapay.com</a>. You can also complain to Ghana's Data Protection Commission.</p>
<h2 id="changes-to-this-policy">Changes to this policy</h2>
<p>If we change this policy, we will post the new version on this page with a new effective date.</p>
<h2 id="contact">Contact</h2>
<p>Fayaworks Technologies, LLC <a href="mailto:support@fayapay.com">support@fayapay.com</a> <a href="https://fayapay.com">https://fayapay.com</a></p>
`;
