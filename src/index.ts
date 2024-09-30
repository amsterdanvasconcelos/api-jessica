import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const port = process.env.PORT || 3333;

const startServer = () => {
  server.listen(port, () =>
    console.log(`O servidor está rodando na porta ${port}`)
  );
};

// if (process.env.IS_LOCALHOST !== "true") {
//   Knex.migrate
//     .latest()
//     .then(() => {
//       Knex.seed
//         .run()
//         .then(() => startServer())
//         .catch(() => console.log);
//     })
//     .catch(() => console.log);
// } else {
//   startServer();
// }

const init = async () => {
  if (process.env.IS_LOCALHOST === "true") {
    return startServer();
  }

  try {
    await Knex.migrate.latest();
    await Knex.seed.run();
    startServer();
  } catch (error) {
    console.log(error);
  }
};

init();
