resource "google_compute_firewall" "app_allow_http" {
  name    = "${var.project_name}-allow-http"
  network = var.network_name

  allow {
    protocol = "tcp"
    ports    = ["80", "443", "3000"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["${var.project_name}-app"]
}

resource "google_compute_firewall" "db_allow_internal" {
  name    = "${var.project_name}-db-allow-internal"
  network = var.network_name

  allow {
    protocol = "tcp"
    ports    = ["3306", "5432"]
  }

  source_tags = ["${var.project_name}-app"]
  target_tags = ["${var.project_name}-db"]
}

resource "google_compute_firewall" "cache_allow_internal" {
  name    = "${var.project_name}-cache-allow-internal"
  network = var.network_name

  allow {
    protocol = "tcp"
    ports    = ["6379"]
  }

  source_tags = ["${var.project_name}-app"]
  target_tags = ["${var.project_name}-cache"]
}
