variable "project_name" { type = string }
variable "environment"  { type = string }
variable "vpc_id"       { type = string }
variable "public_subnet_ids" { type = list(string) }
variable "enable_waf" {
  type    = bool
  default = false
}
variable "app_port"     { 
  type = number
  default = 3000
}
