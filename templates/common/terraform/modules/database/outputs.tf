output "db_endpoint" {
  value = aws_db_instance.main.endpoint
}

output "db_name" {
  value = aws_db_instance.main.db_name
}

output "db_user" {
  value = aws_db_instance.main.username
}

output "db_password" {
  value     = random_password.db_password.result
  sensitive = true
}
