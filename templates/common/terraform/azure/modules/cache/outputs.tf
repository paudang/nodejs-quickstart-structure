output "redis_endpoint" {
  value = "${azurerm_redis_cache.cache.hostname}:${azurerm_redis_cache.cache.ssl_port}"
}
