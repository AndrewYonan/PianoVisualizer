for f in *#*; do
    mv -- "$f" "${f//#/S}";
done