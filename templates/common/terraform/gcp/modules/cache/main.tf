resource "google_redis_instance" "cache" {
  name           = "${var.project_name}-cache"
  tier           = "BASIC"
  memory_size_gb = 1

  region             = var.region
  authorized_network = var.network_id
}
