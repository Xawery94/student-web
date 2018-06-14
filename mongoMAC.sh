#!/bin/bash

Mysql.server start

echo "checking mongo..."
ISMONGO=`ps -ef | grep mongod | grep -v grep | wc -l | tr -d ' '`

if [ $ISMONGO == "0" ]
then
    echo "starting mongo..."
    cd /Users/kjanik/Documents/backend/mongoDB/mongodb/
    bin/mongod --dbpath=/Users/kjanik/mongoDB/data/db/ --fork --logpath /tmp/mongodb.log
else
    echo "mongo is already running"
fi