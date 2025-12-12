import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Make the business card the homepage:
  index("./routes/home.tsx"),

  // Contact page:
  route("contact", "./routes/contact.tsx"),

  //about me page:
  route("about-me", "./routes/about-me.tsx"),

  route("demos", "./routes/demos.tsx"),

  // Keep your existing Welcome page at /welcome:
  route("welcome", "./welcome/welcome.tsx"),
] satisfies RouteConfig;
