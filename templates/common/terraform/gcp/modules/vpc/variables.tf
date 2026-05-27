variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "is_production" {
  type = bool
}

variable "region" {
  type = string
  default = "us-central1"
}
