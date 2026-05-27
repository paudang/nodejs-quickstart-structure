output "db_endpoint" {
  value = var.db_engine == "mysql" ? azurerm_mysql_flexible_server.mysql[0].fqdn : azurerm_postgresql_flexible_server.postgres[0].fqdn
}

output "db_name" {
  value = var.db_name
}

output "db_user" {
  value = var.db_user
}

output "db_password" {
  value     = random_password.db_password.result
  sensitive = true
}
