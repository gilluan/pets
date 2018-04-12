if [ "$1" == "prod" ]; 
then
	pidsYarn=`ps -A | grep yarn | cut -d" " -f1`
	for pid in $pidsYarn
	do
		echo 'Eliminando processo Yarn ' $pid
		kill -9 $pid
	done

	pidsNode=`ps -A | grep node | grep pets | cut -d" " -f1`
	for pid in $pidsNode
	do
		echo 'Eliminando processo Node ' $pid
		kill -9 $pid
	done
else
	pidsYarn=`ps -A | grep yarn | cut -d" " -f1`
	for pid in $pidsYarn
	do
		echo 'Eliminando processo Yarn ' $pid
		kill -9 $pid
	done

	pidsNode=`ps -A | grep node | grep pets | cut -d" " -f1`
	for pid in $pidsNode
	do
		echo 'Eliminando processo Node ' $pid
		kill -9 $pid
	done
fi
