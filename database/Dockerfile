FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=root_password
ENV MYSQL_DATABASE=my_database
ENV MYSQL_USER=my_user
ENV MYSQL_PASSWORD=my_password

COPY insert_scripts/init.sql /docker-entrypoint-initdb.d/

COPY insert_scripts/*.sql /docker-entrypoint-initdb.d/insert_scripts/

RUN chmod -R 755 /docker-entrypoint-initdb.d/

EXPOSE 3306

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]