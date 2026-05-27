resource "random_password" "db_password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "azurerm_mysql_flexible_server" "mysql" {
  count               = var.db_engine == "mysql" ? 1 : 0
  name                = "${var.project_name}-mysql"
  resource_group_name = var.resource_group_name
  location            = var.location
  administrator_login    = var.db_user
  administrator_password = random_password.db_password.result
  sku_name            = "B_Standard_B1s"
  version             = "8.0.21"
  delegated_subnet_id = var.private_subnet_id
}

resource "azurerm_mysql_flexible_database" "mysql_db" {
  count               = var.db_engine == "mysql" ? 1 : 0
  name                = var.db_name
  resource_group_name = var.resource_group_name
  server_name         = azurerm_mysql_flexible_server.mysql[0].name
  charset             = "utf8"
  collation           = "utf8_unicode_ci"
}

resource "azurerm_postgresql_flexible_server" "postgres" {
  count               = var.db_engine == "postgres" ? 1 : 0
  name                = "${var.project_name}-postgres"
  resource_group_name = var.resource_group_name
  location            = var.location
  administrator_login    = var.db_user
  administrator_password = random_password.db_password.result
  sku_name            = "B_Standard_B1ms"
  version             = "13"
  delegated_subnet_id = var.private_subnet_id
}

resource "azurerm_postgresql_flexible_server_database" "postgres_db" {
  count               = var.db_engine == "postgres" ? 1 : 0
  name                = var.db_name
  server_id           = azurerm_postgresql_flexible_server.postgres[0].id
  collation           = "en_US.utf8"
  charset             = "utf8"
}
