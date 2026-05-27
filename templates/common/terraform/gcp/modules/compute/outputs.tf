output "instance_ids" {
  value = google_compute_instance.app[*].id
}
