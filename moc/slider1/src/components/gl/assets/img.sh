for i in `seq 1 20`
do
  curl -o $i.jpg -L https://picsum.photos/3200/1800
done
