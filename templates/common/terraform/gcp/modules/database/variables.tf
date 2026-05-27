variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "region" {
  type = string
  default = "us-central1"
}

variable "network_id" {
  type = string
}

variable "db_engine" {
  type = string
}

variable "db_name" {
  type = string
}

variable "db_user" {
  type = string
}

variable "multi_az" {
  type = bool
  default = false
}

variable "db_instance_class" {
  type = string
  default = "db-f1-micro"
}
