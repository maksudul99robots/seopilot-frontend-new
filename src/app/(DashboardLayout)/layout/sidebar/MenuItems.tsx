import {
  IconSearch,
  IconNews,
  IconWallet,
  IconAd,
  IconUsersGroup,
  IconSettings,
  IconHeartHandshake
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Actions",
  },

  {
    id: uniqueId(),
    title: "Publications",
    icon: IconNews,
    href: "/",
  },
  // {
  //   navlabel: true,
  //   subheader: "Sponsorship",
  // },
  {
    id: uniqueId(),
    title: "Sponsorship",
    icon: IconHeartHandshake,
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Payouts",
    icon: IconWallet,
    href: "/utilities/shadow",
  },
  {
    id: uniqueId(),
    title: "Ad Network",
    icon: IconAd,
    href: "/utilities/shadow1",
  },
  {
    id: uniqueId(),
    title: "Team",
    icon: IconUsersGroup,
    href: "/utilities/shadow2",
  },
  {
    id: uniqueId(),
    title: "Settings",
    icon: IconSettings,
    href: "/utilities/shadow3",
  },

  {
    navlabel: true,
    subheader: "Search",
  },
  {
    id: uniqueId(),
    title: "Search Publication",
    icon: IconSearch,
    href: "/login",
  },
  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
];

export default Menuitems;
