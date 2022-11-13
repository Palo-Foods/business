module.exports = {
  env: {
    MONGODB_URI:
      "mongodb+srv://admin-palo:uMexTO37dgJ3OezS@cluster-palo-foods.j3b6f.mongodb.net/?retryWrites=true&w=majority",
    MONGODB_DB: "palofoods",

    NEXT_SECRET: "683caef9-86dd-4d69-bf0f-d152f0049d94",

    MAIL_HOST: "mail.palofoods.com",
    MAIL_PORT: 465,
    MAIL_AUTH_USER: "info@palofoods.com",
    MAIL_AUTH_PASSWORD: "yuCg7TcxY]00",

    CLOUDINARY_NAME: "alpha-digital-agency",
    CLOUDINARY_API_KEY: "628934891732292",
    CLOUDINARY_API_SECRET: "Cc9w0mgYrq5616bnz3VLuT8ZPzg",

    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: "AIzaSyBGeHpwAD3ekyCtBEKUyzabCVVam7X-FJs",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};
