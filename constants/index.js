export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Inicio",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Buscar",
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/activity",
    label: "Actividad",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-thread",
    label: "Crear Post",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/communities",
    label: "Comunidades",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Perfil",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
