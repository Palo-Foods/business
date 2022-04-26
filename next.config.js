module.exports = {
  env: {
    MONGODB_URI:
      "mongodb+srv://admin-palo:cOqHZo8Osm0bSGzN@cluster-palo-foods.j3b6f.mongodb.net/palofoods?retryWrites=true&w=majority",
    MONGODB_DB: "palofoods",

    NEXT_SECRET: "683caef9-86dd-4d69-bf0f-d152f0049d94",

    MAIL_HOST: "mail.palofoods.com",
    MAIL_PORT: 465,
    MAIL_AUTH_USER: "info@palofoods.com",
    MAIL_AUTH_PASSWORD: "yuCg7TcxY]00",

    CLOUDINARY_NAME: "alpha-digital-agency",
    CLOUDINARY_API_KEY: "628934891732292",
    CLOUDINARY_API_SECRET: "Cc9w0mgYrq5616bnz3VLuT8ZPzg",

    STRIPE_PUBLISHED:
      "pk_test_51KJ2r6GNtASg30ngItLdJq3MoLH1kOKIprhk7TcAnNVZGfaXNmwTclJhJ1Rion6VOhBE6aCkEKp3CZvBbqUjXrI900FOglfXRJ",
    STRIPE_SECRET:
      "sk_test_51KJ2r6GNtASg30ngmbe3bP0ddONCOvMUBWwhr5j7PDWPE9xVFeMxPxtyMS7F4ZYrLBCU09HFq1LK64IZqE448Zpy00LZdvXeNC",

    PAYSTACK_PUBLISHED: "pk_test_12bd7c0fceff86968394c08f13bb7b955149dc2c",

    SMS_API_KEY: "V1ZNVExweWp5em9qdGJRRG1rYmY=",
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
  /*   async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.palofoods.com/:path*",
      },
    ];
  } */
};
