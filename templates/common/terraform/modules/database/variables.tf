variable "project_name" { type = string }
variable "environment"  { type = string }
variable "vpc_id"       { type = string }
variable "isolated_subnet_ids" { type = list(string) }
variable "app_sg_id"    { type = string }
variable "multi_az" {
  type    = bool
  default = false
}

variable "db_engine" {
  description = "Database engine (mysql, postgres)"
  type        = string
  default     = "mysql"
}

variable "db_instance_class" {
  default = "db.t3.micro"
}

variable "db_name" {
  default = "myappdb"
}

variable "db_user" {
  default = "admin"
}
