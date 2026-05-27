terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = "my-gcp-project-id" # Replace with your GCP project ID
  region  = var.gcp_region
}
