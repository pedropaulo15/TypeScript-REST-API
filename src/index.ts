import "reflect-metadata";
import { getApp } from "./app";
import { connecToDatabase } from "./db";

(async function() {
    await connecToDatabase();
    const port = 3000;
    const app = await getApp();
    app.listen(port, () => {
        console.log("App is ready!");
        console.log(`Server running at http://127.0.0.1:${port}.`);
    });
})();
