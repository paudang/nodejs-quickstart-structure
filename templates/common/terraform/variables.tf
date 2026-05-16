variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  default     = "nodejs-quickstart"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  default     = "dev"
}

variable "db_engine" {
  description = "Database engine (mysql or postgres)"
  default     = "mysql"
}

variable "db_name" {
  default = "myappdb"
}

variable "db_user" {
  default = "admin"
}

variable "is_production" {
  description = "Enable production-grade features (Multi-AZ, WAF, Scaling)"
  type        = bool
  default     = false
}
