app:
	@docker-compose up app
test:
	@docker-compose up app_test
destroy:
	@docker-compose down -v --rmi local
mig:
	@docker-compose up migrations
