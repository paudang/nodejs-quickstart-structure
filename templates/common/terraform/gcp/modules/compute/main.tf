data "google_compute_image" "debian_image" {
  family  = "debian-11"
  project = "debian-cloud"
}

resource "google_compute_instance" "app" {
  count        = var.instance_count
  name         = "${var.project_name}-app-${count.index + 1}"
  machine_type = var.instance_type
  zone         = "${var.region}-a"

  tags = ["${var.project_name}-app"]

  boot_disk {
    initialize_params {
      image = data.google_compute_image.debian_image.self_link
    }
  }

  network_interface {
    subnetwork = var.private_subnet_id
  }

  metadata_startup_script = <<-EOF
    #!/bin/bash
    apt-get update -y
    apt-get install -y docker.io
    systemctl start docker
    systemctl enable docker
  EOF
}
