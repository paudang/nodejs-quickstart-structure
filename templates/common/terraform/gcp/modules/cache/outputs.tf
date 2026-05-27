output "redis_endpoint" {
  value = "${google_redis_instance.cache.host}:${google_redis_instance.cache.port}"
}
