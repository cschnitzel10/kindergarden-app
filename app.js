// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Require seed file
const seedDb = require("./db/seed");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");




hbs.registerHelper("prettifyDate", function(timestamp) {
    
    return new Date(timestamp).toString().substring(0, 15) });

hbs.registerHelper("admin", function (user) {
  if (!user) {
    return "";
  } else if (user.roles == "Admin") {
    return `<button>
        <a class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            href="/admin/create-news">
            ADD NEWS </a>            
    </button>
                <a href="/auth/logout" class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap underline">Logout</a>
`;
  } else {
    return "";
  }

});

const app = express();
// seedDb();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "project2";

app.locals.appTitle = 'Kindergarden App';

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

const testRoutes = require("./routes/test.routes");
app.use("/tests", testRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
