pidsYarn=`ps -ef | grep yarn | cut -d" " -f4`
for pid in $pidsYarn
do
	echo 'Eliminando processo Yarn ' $pid
	kill -9 $pid
done

pidsNode=`ps -ef | grep node | grep pets | cut -d" " -f4`
for pid in $pidsNode
do
	echo 'Eliminando processo Node ' $pid
	kill -9 $pid
done

