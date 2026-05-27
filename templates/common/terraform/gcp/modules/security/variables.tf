variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "network_name" {
  type = string
}

variable "enable_waf" {
  type = bool
  default = false
}
