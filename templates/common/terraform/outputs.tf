output "application_url" {
  description = "URL of the application (Load Balancer)"
  value       = "http://${module.security.alb_dns_name}"
}

output "database_endpoint" {
  value = module.database.db_endpoint
}

output "database_name" {
  value = module.database.db_name
}

output "database_user" {
  value = module.database.db_user
}

output "database_password" {
  value     = module.database.db_password
  sensitive = true
}

output "nat_gateway_ip" {
  value = module.vpc.nat_gateway_ip
}

output "redis_endpoint" {
  value = module.cache.redis_endpoint
}
