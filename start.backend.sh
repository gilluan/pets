if [ "$1" == "prod" ]; 
then
    echo "Ambiente : " $1
    cd graphql && npm install && npm start &
else
    echo "Ambiente : DEV"
    cd graphql && npm install && npm run dev &
fi