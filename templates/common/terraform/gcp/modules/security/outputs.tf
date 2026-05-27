output "app_target_tag" {
  value = "${var.project_name}-app"
}

output "db_target_tag" {
  value = "${var.project_name}-db"
}

output "cache_target_tag" {
  value = "${var.project_name}-cache"
}
