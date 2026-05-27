variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "location" {
  type = string
}

variable "resource_group_name" {
  type = string
}

variable "public_subnet_id" {
  type = string
}

variable "enable_waf" {
  type = bool
  default = false
}
