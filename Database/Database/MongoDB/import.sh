# Importing existing collections via shell command.
# mongorestore is part of Mongo Tools which placed inside /bin folder.
# mongorestore syntax: mongorestore -d <database-name> <dupm-folder>
/bin/mongorestore -d northwind /docker-entrypoint-initdb.d/northwind

# Print success message:
echo "Weeeeee - successfully imported collections."
