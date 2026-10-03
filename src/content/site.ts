export const site = {
  name: "FayaPay",
  url: "https://fayapay.com",
  title: "FayaPay: send money, buy airtime and check balance by USSD",
  description:
    "Send money, buy airtime and check your balance on MTN MoMo, Telecel Cash and AT Money. FayaPay dials the USSD code and answers the menus for you.",
  socialDescription:
    "Send money, buy airtime and check your balance in a few taps. FayaPay dials the USSD code and answers the menus for you.",
  ogAlt: "FayaPay: Automate your USSD, beside the app's home screen",
  appDescription:
    "FayaPay dials your mobile money USSD codes and answers the menus for you: send money, buy airtime and check your balance on MTN MoMo, Telecel Cash and AT Money, with every payment from your SMS receipts in one list.",
  appVersion: "1.0.0",
  supportEmail: "support@fayapay.com",
  maker: { name: "Fayaworks Technologies, LLC", url: "https://fayaworks.com" },
  requirement: "Android 7 and newer",
} as const;

export const nav = [
  { href: "/#how", label: "How it works" },
  { href: "/#send", label: "Sending money" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/#questions", label: "Questions" },
] as const;

export const hero = {
  code: "*123#",
  title: "Automate your USSD",
  body: "Sending money, airtime and balance checks are ready to go. Tap one and FayaPay dials and answers the menus for you.",
  cta: "Download for Android",
} as const;

export type Network = { id: "mtn" | "telecel" | "at"; chip: string; name: string };

export const networks: Network[] = [
  { id: "mtn", chip: "MTN", name: "MTN MoMo" },
  { id: "telecel", chip: "Telecel", name: "Telecel Cash" },
  { id: "at", chip: "AT", name: "AT Money" },
];

export const coverage = {
  title: "Works with the mobile money you already have",
  body: "FayaPay isn't a new wallet. It runs your own MoMo menus on your own SIMs, so your money stays where it is.",
  capabilities: [
    "Send money, to the same network or any other",
    "Check your balance",
    "Buy airtime, for yourself or anyone else",
    "Payment history from your SMS receipts",
  ],
  note: "Two SIMs? FayaPay sets up an account for each and always dials on the right one.",
} as const;

export type Shot = { src: string; alt: string; title: string; body: string };

/** Titles and text are the app's own onboarding wording, from the screenshots. */
export const journey = {
  title: "From the first tap to every payment",
  steps: [
    {
      src: "/screens/flows.webp",
      alt: "Flows for everything you do by USSD: Send money, Buy airtime, Stanbic balance and Data bundle tiles, with Data bundle pinned",
      title: "Flows for everything you do by USSD",
      body: "The common ones are built in. Download more for your bank and bills, or make your own. Pin your favourites to your home screen.",
    },
    {
      src: "/screens/dial.webp",
      alt: "Let FayaPay dial for you: a *123# code with rings rippling out",
      title: "Let FayaPay dial for you",
      body: "FayaPay needs phone access to dial USSD codes and to see which SIMs and numbers are on this phone.",
    },
    {
      src: "/screens/menus.webp",
      alt: "Let FayaPay answer the menus: a USSD pop-up with 3 Check Balance chosen and Send pressed",
      title: "Let FayaPay answer the menus",
      body: "FayaPay uses Android accessibility to choose options in the USSD pop-up. It only reads those pop-ups, nothing else.",
    },
    {
      src: "/screens/sms.webp",
      alt: "Keep track of every payment: an SMS receipt from Ama Serwaa becoming a row in the payment history",
      title: "Keep track of every payment",
      body: "Allow SMS to build your transaction history from your mobile money receipts. FayaPay doesn't read your other messages.",
    },
  ] satisfies Shot[],
};

export const sending = {
  title: "Sending money, start to finish",
  body: "Pick who to pay, enter the amount and your PIN, then check the details before anything is sent.",
  steps: [
    {
      src: "/screens/send-recipient.webp",
      alt: "Recipient number: a list of contacts to pick from",
      title: "Recipient",
      body: "Pick who to pay from a list of your contacts.",
    },
    {
      src: "/screens/send-amount.webp",
      alt: "Amount: GHS 50 entered on the number pad",
      title: "Amount",
      body: "Enter the amount on the number pad.",
    },
    {
      src: "/screens/send-confirm.webp",
      alt: "Send GHS50.00 to Ama Serwaa? The recipient, number, amount, fee and reference, with Confirm and Cancel",
      title: "Confirm",
      body: "Check the recipient, number, amount, fee and reference.",
    },
    {
      src: "/screens/send-done.webp",
      alt: "Success: the transaction ID, amount, fee and new balance",
      title: "Success",
      body: "See the transaction ID, amount, fee and new balance.",
    },
  ] satisfies Shot[],
};

export const privacy = {
  title: "Your money stays yours",
  promises: [
    {
      id: "pin",
      title: "Your PIN is never saved",
      body: "You type it each time a menu asks for it. FayaPay answers the menu with it and forgets it.",
    },
    {
      id: "upload",
      title: "Nothing personal is uploaded",
      body: "Your SMS, contacts, phone numbers, payments and balances stay on your phone.",
    },
    {
      id: "reads",
      title: "It reads only what it needs",
      body: "Only your mobile money receipts, not your other messages. Only the USSD pop-ups of a flow you started, not other apps.",
    },
    {
      id: "ads",
      title: "No ads",
      body: "No advertising ID either. Crash and usage reports never contain your SMS, numbers or PIN, and you can turn them off in Settings.",
    },
  ],
  link: "Read the privacy policy",
} as const;

export const faqs = [
  {
    q: "Does FayaPay charge fees?",
    a: "FayaPay runs the same USSD menus you would, so your network charges its usual fees and nothing more. FayaPay shows each fee in your history. USSD works without mobile data.",
  },
  {
    q: "Why does FayaPay need Accessibility?",
    a: "To read your network's USSD pop-up while a flow you started is running, choose the options and type your answers. It doesn't read other apps or anything else on your screen, and it asks before turning it on.",
  },
  {
    q: "Why does it read my SMS?",
    a: "Your network sends an SMS receipt after every payment. FayaPay reads only those receipts to build your history and show your balance, and skips every other message.",
  },
  {
    q: "Which phones does it work on?",
    a: "Android 7 and newer, with one or two SIMs from MTN, Telecel or AT in Ghana. There's no iPhone version, because iPhones don't let apps run USSD.",
  },
  {
    q: "What if a menu changes?",
    a: "FayaPay checks each menu before it answers. If one doesn't match what it expects, it stops and tells you, instead of guessing. Updated menus arrive as signed updates, at most once a day.",
  },
] as const;

export const install = {
  title: "Get FayaPay",
  steps: [
    {
      text: "Open the file you downloaded. If Android asks, allow your browser to install apps.",
    },
    {
      strong: "Install",
      before: "Tap ",
      text: ". Android may warn that the app didn't come from Google Play. That's expected.",
    },
    {
      strong: "Get started",
      before: "Open FayaPay and tap ",
      text: ". It explains each permission before it asks.",
    },
  ],
} as const;

/** The hero demo. Menu wording follows the app's own onboarding screenshot. */
export const demo = {
  code: "*123#",
  account: "MTN · 024 555 0123",
  balance: 607.16,
  menu: ["Send Money", "Airtime", "Check Balance", "My Account"],
  recent: [
    { initials: "KM", name: "Kofi Mensah", when: "18:45", amount: "-80.00" },
    { initials: "YB", name: "Yaw Boateng", when: "Sun 27 Sep", amount: "+250.00" },
  ],
  flows: [
    {
      id: "send",
      label: "Send money",
      outcome: "Sent",
      pick: 1,
      prompt: "Send GHS 50.00 to Ama Serwaa. Enter PIN",
      from: 657.16,
      result: { title: "Sent", detail: "GHS 50.00 to Ama Serwaa" },
    },
    {
      id: "airtime",
      label: "Buy airtime",
      outcome: "GHS 10.00",
      pick: 2,
      prompt: "Buy GHS 10.00 airtime for 024 555 0123. Enter PIN",
      from: 617.16,
      result: { title: "Airtime bought", detail: "GHS 10.00" },
    },
    {
      id: "balance",
      label: "Check balance",
      outcome: "GHS 607.16",
      pick: 3,
      prompt: "Check balance. Enter PIN",
      from: 0,
      result: { title: "Balance", detail: "GHS 607.16" },
    },
  ],
} as const;
