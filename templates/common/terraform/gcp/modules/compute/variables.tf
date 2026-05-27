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

variable "private_subnet_id" {
  type = string
}

variable "instance_count" {
  type = number
  default = 1
}

variable "instance_type" {
  type = string
  default = "e2-medium"
}
