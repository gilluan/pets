echo "Ambiente : " $1
if [ "$1" == "dev" ]; 
then
    cd graphql && npm install && npm run dev &
else
    cd graphql && npm install && npm start &
fi