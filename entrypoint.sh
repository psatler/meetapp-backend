# https://stackoverflow.com/questions/55483781/how-to-create-postgres-database-and-run-migration-when-docker-compose-up

# npm install
npx sequelize db:migrate
npm run queue &
npm run dev
